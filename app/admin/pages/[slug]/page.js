"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Save,
    ArrowLeft,
    Layout,
    AlertCircle,
    RotateCcw
} from 'lucide-react';
import { getPostBySlug, createPost, updatePost } from '@/lib/posts';
import { useAuth } from '@/context/AuthContext';
import CodeBlock from '@/components/CodeBlock'; // Reusing for JSON preview

// Default Schemas for known pages to help the user start
const PAGE_TEMPLATES = {
    home: {
        hero: {
            title: "Build Faster. Code Better.",
            description: "The ultimate developer playground and toolkit. Compile code, fix errors, and improve your workflow instantly.",
            ctaPrimary: { label: "Start Coding", href: "/compiler" },
            ctaSecondary: { label: "View Tools", href: "/tools" },
            announcement: { show: true, text: "New: Python 3.12 Support Added!", href: "/blog/python-update" }
        },
        features: {
            title: "Everything you need in one place",
            items: [
                { title: "Online Compiler", desc: "Run code in 10+ languages instantly." },
                { title: "API Tester", desc: "Debug REST APIs without leaving your browser." }
            ]
        }
    },
    tools: {
        hero: {
            title: "Developer Utilities",
            description: "A collection of 70+ powerful tools to help you develop, debug, and ship faster."
        }
    },
    // Default fallback
    default: {
        title: "Page Title",
        description: "Page Description",
        sections: []
    }
};

export default function PageEditor() {
    const { slug } = useParams(); // e.g. 'home'
    const router = useRouter();
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [post, setPost] = useState(null); // The actual Post object from DB

    // Editor State
    // We store the JSON content in the 'content' field of the post as a stringified JSON
    const [jsonContent, setJsonContent] = useState('{}');
    const [error, setError] = useState(null);

    const fullSlug = `page-${slug}`;

    useEffect(() => {
        loadPageData();
    }, [slug]);

    const loadPageData = async () => {
        setIsLoading(true);
        try {
            const existingPost = await getPostBySlug(fullSlug);

            if (existingPost) {
                setPost(existingPost);
                // Try to parse content as JSON, or use raw if fail
                try {
                    // Check if content is valid JSON
                    const parsed = JSON.parse(existingPost.content);
                    setJsonContent(JSON.stringify(parsed, null, 4));
                } catch (e) {
                    // Content might be plain text or markdown if messed up, just show as is
                    setJsonContent(existingPost.content || '{}');
                }
            } else {
                // New Page - Load Template
                const template = PAGE_TEMPLATES[slug] || PAGE_TEMPLATES.default;
                setJsonContent(JSON.stringify(template, null, 4));
            }
        } catch (error) {
            console.error("Failed to load page:", error);
            setError("Failed to load page data.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);

        // Validate JSON
        try {
            JSON.parse(jsonContent);
        } catch (e) {
            setError("Invalid JSON format. Please fix syntax errors before saving.");
            setIsSaving(false);
            return;
        }

        const payload = {
            slug: fullSlug,
            title: `System Page: ${slug}`, // Internal title
            content: jsonContent, // Stored as stringified JSON
            language: 'system:page',
            status: 'published',
            description: `Configuration for ${slug} page.`,
            authorId: user.$id,
            authorName: user.name
            // We don't strictly need seoTitle/seoDesc here if it's inside JSON, 
            // but we could map them if we wanted separate fields.
        };

        try {
            if (post) {
                await updatePost(fullSlug, payload);
            } else {
                await createPost(payload);
            }
            // Reload to ensure sync
            await loadPageData();
            alert("Page configuration saved successfully!");
        } catch (e) {
            console.error("Save failed:", e);
            setError("Failed to save changes: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        if (confirm("Reset to default template? Current changes will be lost.")) {
            const template = PAGE_TEMPLATES[slug] || PAGE_TEMPLATES.default;
            setJsonContent(JSON.stringify(template, null, 4));
        }
    };

    if (isLoading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-surface rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-black text-text-primary tracking-tight capitalize">{slug} Page</h1>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface border border-border text-text-secondary">
                                {post ? 'Editing' : 'Creating'}
                            </span>
                        </div>
                        <p className="text-sm text-text-secondary">Edit content JSON configuration.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text-secondary hover:text-text-primary rounded-xl font-bold transition-all"
                    >
                        <RotateCcw size={16} />
                        Reset Defaults
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-xl font-bold shadow-lg shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>Saving...</>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 flex items-center gap-3">
                    <AlertCircle size={20} />
                    <span className="font-medium">{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div className="space-y-4">
                    <div className="bg-panel border border-border rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px]">
                        <div className="bg-surface border-b border-border px-4 py-2 text-xs font-bold text-text-secondary uppercase tracking-wider flex justify-between items-center">
                            <span>Configuration (JSON)</span>
                            <span className="text-text-tertiary">system:page</span>
                        </div>
                        <textarea
                            value={jsonContent}
                            onChange={(e) => setJsonContent(e.target.value)}
                            className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm p-4 resize-none focus:outline-none"
                            spellCheck="false"
                        />
                    </div>
                    <p className="text-xs text-text-tertiary">
                        * Edit the JSON structure above to change page text, links, and visibility.
                        The frontend will automatically reflect these changes if connected.
                    </p>
                </div>

                {/* Preview / Help */}
                <div className="space-y-4">
                    <div className="bg-panel border border-border rounded-xl p-6 h-[600px] overflow-y-auto">
                        <h3 className="text-sm font-bold text-text-primary mb-4 uppercase tracking-wider">Preview Structure</h3>
                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-text-secondary mb-4">
                                This is a visual representation of the data structure. Use this to verify that your JSON is valid and structured correctly.
                            </p>
                            {/* We use CodeBlock to show "Formatted" view or just parsed object visualization */}
                            <div className="bg-surface rounded-lg border border-border">
                                <CodeBlock
                                    code={jsonContent}
                                    language="json"
                                    showLineNumbers={false}
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-border">
                            <h4 className="font-bold mb-2">Tips</h4>
                            <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                                <li>Ensure all keys are quoted (JSON standard).</li>
                                <li>Don't leave trailing commas.</li>
                                <li>Use the "Reset Defaults" button if you break the structure.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
