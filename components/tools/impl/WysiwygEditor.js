"use client";

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Strikethrough, Code, List, ListOrdered,
    Quote, Undo, Redo, AlignLeft, AlignCenter, AlignRight,
    Link as LinkIcon, Heading1, Heading2, Terminal
} from 'lucide-react';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const activeButtonClass = "bg-accent-primary/10 text-accent-primary";
    const buttonClass = "p-2 rounded-lg hover:bg-surface-highlight transition-colors text-text-secondary hover:text-text-primary";

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-surface-highlight/30 sticky top-0 z-10 backdrop-blur-sm">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`${buttonClass} ${editor.isActive('bold') ? activeButtonClass : ''}`}
                title="Bold"
            >
                <Bold size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`${buttonClass} ${editor.isActive('italic') ? activeButtonClass : ''}`}
                title="Italic"
            >
                <Italic size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`${buttonClass} ${editor.isActive('underline') ? activeButtonClass : ''}`}
                title="Underline"
            >
                <UnderlineIcon />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`${buttonClass} ${editor.isActive('strike') ? activeButtonClass : ''}`}
                title="Strikethrough"
            >
                <Strikethrough size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`${buttonClass} ${editor.isActive('code') ? activeButtonClass : ''}`}
                title="Inline Code"
            >
                <Code size={16} />
            </button>

            <div className="w-px h-6 bg-border mx-1 my-auto"></div>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${buttonClass} ${editor.isActive('heading', { level: 1 }) ? activeButtonClass : ''}`}
                title="Heading 1"
            >
                <Heading1 size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${buttonClass} ${editor.isActive('heading', { level: 2 }) ? activeButtonClass : ''}`}
                title="Heading 2"
            >
                <Heading2 size={16} />
            </button>

            <div className="w-px h-6 bg-border mx-1 my-auto"></div>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${buttonClass} ${editor.isActive('bulletList') ? activeButtonClass : ''}`}
                title="Bullet List"
            >
                <List size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${buttonClass} ${editor.isActive('orderedList') ? activeButtonClass : ''}`}
                title="Ordered List"
            >
                <ListOrdered size={16} />
            </button>

            <div className="w-px h-6 bg-border mx-1 my-auto"></div>

            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`${buttonClass} ${editor.isActive({ textAlign: 'left' }) ? activeButtonClass : ''}`}
                title="Align Left"
            >
                <AlignLeft size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`${buttonClass} ${editor.isActive({ textAlign: 'center' }) ? activeButtonClass : ''}`}
                title="Align Center"
            >
                <AlignCenter size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`${buttonClass} ${editor.isActive({ textAlign: 'right' }) ? activeButtonClass : ''}`}
                title="Align Right"
            >
                <AlignRight size={16} />
            </button>

            <div className="w-px h-6 bg-border mx-1 my-auto"></div>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`${buttonClass} ${editor.isActive('blockquote') ? activeButtonClass : ''}`}
                title="Quote"
            >
                <Quote size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`${buttonClass} ${editor.isActive('codeBlock') ? activeButtonClass : ''}`}
                title="Code Block"
            >
                <Terminal size={16} />
            </button>

            <div className="w-px h-6 bg-border mx-1 my-auto"></div>

            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className={buttonClass}
                title="Undo"
            >
                <Undo size={16} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className={buttonClass}
                title="Redo"
            >
                <Redo size={16} />
            </button>
        </div>
    );
};

// Custom Icon for Underline to avoid lucide collision if needed, though Lucide has Underline
const UnderlineIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
        <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
)

export default function WysiwygEditor() {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: `
            <h2>Welcome to your new editor!</h2>
            <p>This is a <strong>WYSIWYG</strong> editor built with Tiptap. Feel free to edit this text.</p>
            <ul>
                <li>Rich text formatting</li>
                <li>Lists and Headings</li>
                <li>Code blocks and clean output</li>
            </ul>
        `,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-6',
            },
        },
    });

    return (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-[500px]">
            <MenuBar editor={editor} />
            <div className="flex-1 cursor-text bg-surface">
                <EditorContent editor={editor} />
            </div>
            <div className="border-t border-border p-2 bg-surface-highlight/20 text-xs text-text-tertiary flex justify-between px-4">
                <span>{editor?.storage.characterCount?.words?.() || 0} words</span>
                <span>HTML Output available</span>
            </div>
        </div>
    );
}
