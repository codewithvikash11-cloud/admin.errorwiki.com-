"use client";
import React, { useState, useEffect } from 'react';
import { Globe, Copy, Check, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function MetaGenerator() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('website');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateTags();
    }, [title, description, keywords, author, url, image, type]);

    const generateTags = () => {
        let tags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">`;

        setOutput(tags);
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Globe size={18} className="text-accent-primary" /> Configuration
                </h3>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-text-secondary uppercase">Site Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="My Awesome Website"
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent-primary outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-text-secondary uppercase">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="A brief description of your content..."
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent-primary outline-none resize-none h-20"
                        />
                        <div className="text-xs text-right text-text-tertiary">{description.length}/160 recommended</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-text-secondary uppercase">Keywords</label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="react, tools, dev"
                                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent-primary outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-text-secondary uppercase">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-text-secondary uppercase">Website URL</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent-primary outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-text-secondary uppercase">Image URL (OG/Twitter)</label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="https://example.com/og-image.jpg"
                                className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-accent-primary outline-none"
                            />
                            <div className="w-10 h-10 rounded-lg bg-surface-highlight border border-border flex items-center justify-center overflow-hidden">
                                {image ? <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} /> : <ImageIcon size={16} className="text-text-tertiary" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col h-full">
                <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center justify-between">
                    Generated HTML
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 text-xs font-bold bg-accent-primary text-white px-3 py-1.5 rounded-lg hover:bg-accent-hover transition-colors"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy Code'}
                    </button>
                </h3>

                <div className="flex-1 relative">
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-full min-h-[400px] bg-[#0f172a] border border-border rounded-xl px-4 py-4 text-sm font-mono text-blue-300 focus:outline-none resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
