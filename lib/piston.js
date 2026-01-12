export const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

export const LANGUAGES = {
    javascript: { version: '18.15.0', alias: 'node' },
    python: { version: '3.10.0', alias: 'python' },
    cpp: { version: '10.2.0', alias: 'c++' },
    java: { version: '15.0.2', alias: 'java' },
    csharp: { version: '6.12.0', alias: 'mono' },
    go: { version: '1.16.2', alias: 'go' },
    rust: { version: '1.68.2', alias: 'rust' },
    php: { version: '8.2.3', alias: 'php' },
};

export const executeCode = async (language, sourceCode, args = []) => {
    try {
        const langConfig = LANGUAGES[language];
        if (!langConfig) throw new Error(`Language ${language} not supported`);

        // Handle specific naming for Piston
        const runData = {
            language: language === 'cpp' ? 'c++' : language,
            version: langConfig.version,
            files: [
                {
                    content: sourceCode
                }
            ],
            stdin: "",
            args: args,
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1,
        };

        const response = await fetch(`${PISTON_API_URL}/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(runData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Execution failed:", error);
        return { run: { output: `Error: ${error.message}` } };
    }
};

export const getRuntimes = async () => {
    try {
        const response = await fetch(`${PISTON_API_URL}/runtimes`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch runtimes:", error);
        return [];
    }
};
