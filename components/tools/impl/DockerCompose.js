"use client";

import React, { useState } from 'react';
import { Box, Copy, Check, Terminal, ArrowRight, ArrowDown } from 'lucide-react';

export default function DockerCompose() {
    const [input, setInput] = useState('docker run -d --name my-container -p 8080:80 -v /data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret mysql:latest');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const parseDockerRun = (cmd) => {
        if (!cmd.trim().startsWith('docker run')) {
            throw new Error('Command must start with "docker run"');
        }

        // Basic tokenizer that respects quotes
        const args = [];
        let current = '';
        let inQuote = null;

        for (let i = 0; i < cmd.length; i++) {
            const char = cmd[i];
            if (inQuote) {
                if (char === inQuote) {
                    inQuote = null;
                } else {
                    current += char;
                }
            } else {
                if (char === '"' || char === "'") {
                    inQuote = char;
                } else if (char === ' ') {
                    if (current) {
                        args.push(current);
                        current = '';
                    }
                } else {
                    current += char;
                }
            }
        }
        if (current) args.push(current);

        // Parse args
        const config = {
            image: '',
            ports: [],
            volumes: [],
            environment: [],
            networks: [],
            restart: '',
            container_name: '',
            command: []
        };

        let imageFound = false;

        for (let i = 2; i < args.length; i++) { // Skip 'docker' and 'run'
            const arg = args[i];

            if (imageFound) {
                // Everything after image is the command
                config.command.push(arg);
                continue;
            }

            if (arg.startsWith('-')) {
                // It's a flag
                if (arg === '-p' || arg === '--publish') {
                    config.ports.push(args[++i]);
                } else if (arg === '-v' || arg === '--volume') {
                    config.volumes.push(args[++i]);
                } else if (arg === '-e' || arg === '--env') {
                    config.environment.push(args[++i]);
                } else if (arg === '--name') {
                    config.container_name = args[++i];
                } else if (arg === '--restart') {
                    config.restart = args[++i];
                } else if (arg === '--network') {
                    config.networks.push(args[++i]);
                } else if (arg === '-d' || arg === '--detach') {
                    // Ignore
                } else if (arg === '-it' || arg === '-i' || arg === '-t') {
                    // Ignore interactive terminal
                } else if (arg === '--rm') {
                    // Ignore remove
                } else if (arg.startsWith('--')) {
                    // Generic handle for other flags? ignore for now to avoid breaking
                }
            } else {
                // It's the image
                config.image = arg;
                imageFound = true;
            }
        }

        if (!config.image) throw new Error('Could not detect image name');

        return config;
    };

    const generateYaml = (config) => {
        let yaml = `version: '3.8'\nservices:\n`;
        const name = config.container_name || 'app';

        yaml += `  ${name}:\n`;
        yaml += `    image: ${config.image}\n`;

        if (config.container_name) {
            yaml += `    container_name: ${config.container_name}\n`;
        }

        if (config.restart) {
            yaml += `    restart: ${config.restart}\n`;
        }

        if (config.ports.length > 0) {
            yaml += `    ports:\n`;
            config.ports.forEach(p => yaml += `      - "${p}"\n`);
        }

        if (config.volumes.length > 0) {
            yaml += `    volumes:\n`;
            config.volumes.forEach(v => yaml += `      - ${v}\n`);
        }

        if (config.environment.length > 0) {
            yaml += `    environment:\n`;
            config.environment.forEach(e => yaml += `      - ${e}\n`);
        }

        if (config.networks.length > 0) {
            yaml += `    networks:\n`;
            config.networks.forEach(n => yaml += `      - ${n}\n`);
        }

        if (config.command.length > 0) {
            yaml += `    command: ${config.command.join(' ')}\n`;
        }

        if (config.networks.length > 0) {
            yaml += `\nnetworks:\n`;
            config.networks.forEach(n => yaml += `  ${n}:\n    driver: bridge\n`);
        }

        return yaml;
    };

    const convert = () => {
        try {
            setError('');
            const config = parseDockerRun(input.replace(/\\\n/g, ' ').replace(/\\/g, ' ')); // Handle multiline
            const yaml = generateYaml(config);
            setOutput(yaml);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-6 h-[calc(100vh-200px)] min-h-[600px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                {/* Input */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-text-secondary flex items-center gap-2">
                        <Terminal size={16} className="text-accent-primary" />
                        Docker Run Command
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 w-full bg-surface border border-border rounded-xl p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:border-accent-primary transition-colors text-text-primary shadow-sm"
                        placeholder="docker run -p 80:80 nginx"
                    />
                </div>

                {/* Convert Button (Mobile: Center, Desktop: Hidden/Auto) */}
                <div className="lg:hidden flex items-center justify-center">
                    <ArrowDown className="text-text-tertiary animate-bounce" />
                </div>

                {/* Output */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-text-secondary flex items-center gap-2">
                            <Box size={16} className="text-blue-400" />
                            Docker Compose (YAML)
                        </label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:text-accent-hover transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy YAML'}
                            </button>
                        )}
                    </div>
                    <div className="flex-1 relative group">
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-full bg-surface-highlight/30 border border-border rounded-xl p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none text-text-primary"
                            placeholder="version: '3.8'..."
                        />
                        {error && (
                            <div className="absolute inset-x-4 bottom-4 p-3 bg-accent-error/10 border border-accent-error/20 text-accent-error text-sm rounded-lg font-medium animate-in fade-in slide-in-from-bottom-2">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center pt-2">
                <button
                    onClick={convert}
                    className="bg-accent-primary hover:bg-accent-hover text-white font-bold rounded-xl px-12 py-4 shadow-lg shadow-accent-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                    Convert to Compose <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
