"use client";

import React, { useState } from 'react';
import { Search, ChevronRight, Command, Copy, Check } from 'lucide-react';

const GIT_COMMANDS = [
    {
        category: "Configuration",
        items: [
            { cmd: "git config --global user.name \"Name\"", desc: "Set global username" },
            { cmd: "git config --global user.email \"email\"", desc: "Set global email" },
            { cmd: "git config --list", desc: "List all configuration" },
            { cmd: "git help <command>", desc: "Get help for a command" }
        ]
    },
    {
        category: "Starting Up",
        items: [
            { cmd: "git init", desc: "Initialize a repository" },
            { cmd: "git clone <url>", desc: "Clone a remote repository" },
            { cmd: "git clone <url> .", desc: "Clone into current directory" }
        ]
    },
    {
        category: "Staging & Committing",
        items: [
            { cmd: "git status", desc: "Check status of working directory" },
            { cmd: "git add .", desc: "Add all changes to staging" },
            { cmd: "git add <file>", desc: "Add specific file to staging" },
            { cmd: "git commit -m \"Message\"", desc: "Commit staged changes" },
            { cmd: "git commit -am \"Message\"", desc: "Add and commit tracked files" },
            { cmd: "git diff", desc: "Show changes not yet staged" },
            { cmd: "git diff --staged", desc: "Show changes currently staged" }
        ]
    },
    {
        category: "Branching",
        items: [
            { cmd: "git branch", desc: "List all local branches" },
            { cmd: "git branch <name>", desc: "Create a new branch" },
            { cmd: "git checkout <name>", desc: "Switch to a branch" },
            { cmd: "git checkout -b <name>", desc: "Create and switch to new branch" },
            { cmd: "git branch -d <name>", desc: "Delete a branch" },
            { cmd: "git merge <branch>", desc: "Merge branch into current" }
        ]
    },
    {
        category: "Remote & Sync",
        items: [
            { cmd: "git remote -v", desc: "List remote repositories" },
            { cmd: "git remote add origin <url>", desc: "Add remote repository" },
            { cmd: "git push origin <branch>", desc: "Push changes to remote" },
            { cmd: "git push -u origin main", desc: "Push and set upstream" },
            { cmd: "git pull", desc: "Fetch and merge from remote" },
            { cmd: "git fetch", desc: "Fetch specific remote changes" }
        ]
    },
    {
        category: "Undoing Changes",
        items: [
            { cmd: "git reset .", desc: "Unstage all files" },
            { cmd: "git checkout -- <file>", desc: "Discard changes in file" },
            { cmd: "git revert <commit>", desc: "Create new commit reverting changes" },
            { cmd: "git reset --hard HEAD", desc: "Discard all local changes" },
            { cmd: "git commit --amend", desc: "Modify last commit" }
        ]
    },
    {
        category: "Logs & History",
        items: [
            { cmd: "git log", desc: "Show commit history" },
            { cmd: "git log --oneline", desc: "Compact commit history" },
            { cmd: "git log --graph", desc: "Show branch structure" },
            { cmd: "git show <commit>", desc: "Show changes in specific commit" },
            { cmd: "git blame <file>", desc: "Show who changed what and when" }
        ]
    }
];

export default function GitCheatsheet() {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(null);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 1500);
    };

    const filteredCommands = GIT_COMMANDS.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
            item.cmd.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0);

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="relative max-w-lg mx-auto w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search commands (e.g., 'commit', 'reset')..."
                    className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-accent-primary transition-colors font-medium text-text-primary shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-10">
                {filteredCommands.length > 0 ? (
                    filteredCommands.map((category, idx) => (
                        <div key={idx} className="bg-surface border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 50}ms` }}>
                            <h3 className="text-lg font-bold text-text-primary border-b border-border pb-3 flex items-center gap-2">
                                <Command size={18} className="text-accent-primary" />
                                {category.category}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {category.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="group relative">
                                        <div
                                            className="bg-background border border-border rounded-lg p-3 hover:border-accent-primary/50 transition-colors cursor-pointer"
                                            onClick={() => handleCopy(item.cmd)}
                                        >
                                            <div className="font-mono text-sm font-bold text-accent-primary mb-1 break-all pr-8">
                                                {item.cmd}
                                            </div>
                                            <div className="text-xs text-text-secondary font-medium">
                                                {item.desc}
                                            </div>

                                            <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {copied === item.cmd ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-text-tertiary" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-text-tertiary">
                        No commands found matching "{search}"
                    </div>
                )}
            </div>
        </div>
    );
}
