"use client";

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Image as ImageIcon, Link as LinkIcon,
    Quote, Undo, Redo, Save, FileText, Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { documentService } from '@/lib/documents-local';

const MenuBar = ({ editor, onSave, isChecking }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        consturl = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-surface/50 border-b border-border/50 sticky top-0 z-10 backdrop-blur-md">
            {/* Formatting Group */}
            <div className="flex items-center gap-1 pr-2 border-r border-border/50">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    icon={Bold}
                    title="Bold"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    icon={Italic}
                    title="Italic"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    icon={UnderlineIcon}
                    title="Underline"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    icon={Strikethrough}
                    title="Strike"
                />
            </div>

            {/* Alignment Group - Keep hidden on smallest screens to save space, but visible on small tablets */}
            <div className="flex items-center gap-1 px-2 border-r border-border/50 hidden xs:flex">
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    icon={AlignLeft}
                    title="Align Left"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    icon={AlignCenter}
                    title="Align Center"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    icon={AlignRight}
                    title="Align Right"
                />
            </div>

            {/* Lists & Extras Group */}
            <div className="flex items-center gap-1 px-2 border-r border-border/50">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    icon={List}
                    title="Bullet List"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    icon={ListOrdered}
                    title="Ordered List"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    icon={Quote}
                    title="Quote"
                />
            </div>

            {/* Media Group */}
            <div className="flex items-center gap-1 px-2 border-r border-border/50">
                <MenuButton
                    onClick={addImage}
                    icon={ImageIcon}
                    title="Add Image"
                />
                <MenuButton
                    onClick={setLink}
                    isActive={editor.isActive('link')}
                    icon={LinkIcon}
                    title="Add Link"
                />
            </div>

            {/* History Group */}
            <div className="flex items-center gap-1 px-2 border-r border-border/50">
                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    icon={Undo}
                    title="Undo"
                />
                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    icon={Redo}
                    title="Redo"
                />
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-2 ml-auto">
                <button
                    onClick={onSave}
                    disabled={isChecking}
                    className="flex items-center gap-2 px-3 py-1.5 bg-accent-primary text-white rounded-lg text-xs font-bold hover:bg-accent-primary/90 transition-all shadow-lg shadow-accent-primary/20 disabled:opacity-50 disabled:cursor-wait"
                >
                    <Save size={14} />
                    <span className="hidden sm:inline">{isChecking ? 'Scanning...' : 'Save'}</span>
                </button>
            </div>
        </div>
    );
};

const MenuButton = ({ onClick, isActive, disabled, icon: Icon, title }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={cn(
            "p-2 rounded-lg transition-all text-text-secondary hover:text-text-primary",
            isActive ? "bg-accent-primary/10 text-accent-primary" : "hover:bg-surface-highlight",
            disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
        )}
    >
        <Icon size={16} />
    </button>
);

export default function DocsEditor() {
    const [title, setTitle] = useState("Untitled Document");
    const [lastSaved, setLastSaved] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image,
            Link.configure({ openOnClick: false }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: `
            <h2>Welcome to Rovio Tech Docs</h2>
            <p>Start typing your masterpiece here...</p>
            <blockquote>Code is poetry.</blockquote>
        `,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[500px] px-8 py-8 bg-surface dark:bg-surface rounded-xl shadow-sm border border-border/50 text-text-primary',
            },
            handlePaste: (view, event, slice) => {
                const text = slice.content.textBetween(0, slice.content.size);
                if (text && text.length > 0) {
                    behaviorLog.current.push({
                        type: 'paste',
                        timestamp: Date.now(),
                        charCount: text.length
                    });
                }
                return false; // Default behavior
            },
            handleKeyDown: (view, event) => {
                behaviorLog.current.push({
                    type: 'type',
                    timestamp: Date.now()
                });
                return false;
            }
        },
        immediatelyRender: false,
    });

    const behaviorLog = React.useRef([]);

    const [isChecking, setIsChecking] = useState(false);

    // Security Import (Dynamic to avoid server/client issues if needed, but standard import works here)
    const validateContent = require('@/lib/security/content-analyzer').validateContent;
    const adminService = require('@/lib/admin-service').adminService;

    const handleSave = async () => {
        if (!editor || isChecking) return;
        setIsChecking(true);

        try {
            const contentJson = editor.getJSON();
            const textContent = editor.getText(); // For analysis

            // 1. RUN SECURITY CHECKS
            const report = await validateContent(textContent, behaviorLog.current);

            // 2. LOG EVENT TO ADMIN SYSTEM
            adminService.logSecurityEvent({
                ...report,
                contentId: title,
                snippet: textContent.substring(0, 100)
            });

            // 3. ENFORCE RESULTS
            if (report.status === 'REJECTED') {
                alert(`Security Violation: Content Rejected.\n\nReasons:\n${report.violations.join('\n')}\n\nThis incident has been logged.`);
                setIsChecking(false);
                return; // BLOCK SAVE
            }

            // 4. PROCEED IF CLEAN
            documentService.saveDocument({
                id: Date.now().toString(),
                title,
                type: 'doc',
                content: JSON.stringify(contentJson)
            });

            documentService.addToHistory({
                action: `Edited Document: ${title}`,
                preview: textContent.substring(0, 50) + '...',
                tool: 'docs'
            });

            setLastSaved(new Date());
            // alert('Document saved successfully!'); // Silent save is better UX usually, but prompt asked for production ready. I'll keep a toast style or standard alert for now to confirm.

        } catch (error) {
            console.error("Security check failed:", error);
            alert("Error running security validation. Please try again.");
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background relative">
            {/* Header Meta */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 bg-surface">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-primary/10 rounded-lg text-accent-primary">
                        <FileText size={24} />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-accent-primary placeholder:text-text-tertiary w-full sm:w-auto"
                            placeholder="Enter document title..."
                        />
                        <p className="text-xs text-text-secondary">
                            {lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : 'Unsaved changes'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Editor Container */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <MenuBar editor={editor} onSave={handleSave} isChecking={isChecking} />
                <div className="flex-1 overflow-y-auto bg-panel/50 p-4 md:p-8">
                    <div className="max-w-4xl mx-auto min-h-full">
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    );
}
