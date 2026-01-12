"use client";

import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Search,
    ToggleLeft,
    ToggleRight,
    Edit2,
    Save,
    X
} from 'lucide-react';
import { TOOLS_REGISTRY } from '@/components/tools/ToolsRegistry'; // Import local registry
// In a real DB scenario, we would merge DB state with this registry.
// We'll simulate fetching tool "overrides" from DB.

export default function ToolsManager() {
    // State for local registry merged with DB overrides
    const [tools, setTools] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        // Initialize with registry
        // In future: fetch DB overrides and merge
        setTools(TOOLS_REGISTRY);
    }, []);

    const handleToggleStatus = (id) => {
        // Simulate toggle
        setTools(prev => prev.map(t => {
            if (t.id === id) {
                // Determine new status (simulate 'disabled' prop even if not in original registry)
                const newStatus = t.disabled ? false : true;
                return { ...t, disabled: newStatus };
            }
            return t;
        }));
        // TODO: Persist this to DB (create system:tool post)
    };

    const handleEdit = (tool) => {
        setEditingId(tool.id);
        setEditForm({ ...tool });
    };

    const handleSave = () => {
        setTools(prev => prev.map(t => t.id === editingId ? { ...t, ...editForm } : t));
        setEditingId(null);
        // TODO: Persist to DB
    };

    const filteredTools = tools.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight">Tools Manager</h1>
                    <p className="text-text-secondary">Enable/Disable tools and edit metadata.</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-panel border border-border rounded-2xl p-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-accent-primary transition-colors"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map(tool => {
                    const isEditing = editingId === tool.id;
                    const isDisabled = tool.disabled;

                    if (isEditing) {
                        return (
                            <div key={tool.id} className="bg-panel border-2 border-accent-primary rounded-xl p-4 shadow-lg flex flex-col gap-3">
                                <input
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                    className="bg-surface border border-border rounded px-2 py-1 font-bold text-sm"
                                />
                                <textarea
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    className="bg-surface border border-border rounded px-2 py-1 text-xs h-20 resize-none"
                                />
                                <div className="flex items-center gap-2 mt-auto">
                                    <button onClick={handleSave} className="flex-1 bg-accent-primary text-white py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1">
                                        <Save size={12} /> Save
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="px-3 bg-surface border border-border rounded text-text-secondary hover:text-red-500">
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={tool.id} className={`bg-panel border ${isDisabled ? 'border-border/50 opacity-60' : 'border-border'} rounded-xl p-4 hover:shadow-md transition-all relative group`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className={`w-10 h-10 rounded-lg ${tool.color ? tool.color.replace('text-', 'bg-').replace('500', '500/10') : 'bg-surface'} flex items-center justify-center`}>
                                    <tool.icon size={20} className={tool.color} />
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleEdit(tool)}
                                        className="p-1.5 text-text-tertiary hover:text-accent-primary hover:bg-surface rounded-lg transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleToggleStatus(tool.id)}
                                        className={`p-1.5 rounded-lg transition-colors ${isDisabled ? 'text-text-tertiary hover:text-green-500' : 'text-green-500 hover:text-red-500'}`}
                                        title={isDisabled ? "Enable" : "Disable"}
                                    >
                                        {isDisabled ? <ToggleLeft size={20} /> : <ToggleRight size={20} />}
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-text-primary text-sm mb-1 line-clamp-1">{tool.title}</h3>
                            <p className="text-xs text-text-secondary line-clamp-2">{tool.description}</p>

                            {isDisabled && (
                                <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] rounded-xl flex items-center justify-center pointer-events-none">
                                    <span className="bg-surface border border-border text-text-secondary px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-sm">
                                        Disabled
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
