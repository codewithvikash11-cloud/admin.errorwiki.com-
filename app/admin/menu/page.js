'use client';

import React, { useState, useEffect } from 'react';
import { createMenu, updateMenu, deleteMenu, reorderMenus } from '@/lib/actions/menus';
import { getMenus } from '@/lib/actions/menus'; // Will add this to actions
import { Plus, GripVertical, Trash2, Save, Loader2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function MenuBuilder() {
    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [newItem, setNewItem] = useState({ label: '', path: '' });

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = async () => {
        // Need getMenus action
        const data = await getMenus();
        setMenus(data.sort((a, b) => a.order - b.order));
        setIsLoading(false);
    };

    const handleAdd = async () => {
        if (!newItem.label || !newItem.path) return;
        setIsSaving(true);
        await createMenu({ ...newItem, order: menus.length, type: 'custom' });
        setNewItem({ label: '', path: '' });
        await loadMenus();
        setIsSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this menu item?")) return;
        await deleteMenu(id);
        const newMenus = menus.filter(m => m.id !== id);
        setMenus(newMenus);
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(menus);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update local state immediately
        const updatedItems = items.map((item, index) => ({ ...item, order: index }));
        setMenus(updatedItems);

        // Save new order
        await reorderMenus(updatedItems);
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Menu Builder</h1>
                    <p className="text-text-secondary">Manage navigation links.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Add New */}
                <div className="bg-panel border border-border rounded-2xl p-6 h-fit space-y-4">
                    <h3 className="font-bold text-text-primary border-b border-border pb-2">Add Item</h3>
                    <div>
                        <label className="text-xs font-bold text-text-secondary uppercase">Label</label>
                        <input
                            className="w-full bg-surface border border-border rounded-lg p-2 mt-1"
                            value={newItem.label}
                            onChange={e => setNewItem({ ...newItem, label: e.target.value })}
                            placeholder="e.g. Home"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-text-secondary uppercase">Path</label>
                        <input
                            className="w-full bg-surface border border-border rounded-lg p-2 mt-1"
                            value={newItem.path}
                            onChange={e => setNewItem({ ...newItem, path: e.target.value })}
                            placeholder="e.g. /home"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={isSaving || !newItem.label || !newItem.path}
                        className="w-full py-2 bg-accent-primary text-white font-bold rounded-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                        Add Item
                    </button>
                </div>

                {/* List */}
                <div className="md:col-span-2 bg-panel border border-border rounded-2xl p-6">
                    <h3 className="font-bold text-text-primary border-b border-border pb-4 mb-4">Menu Structure</h3>

                    {isLoading ? (
                        <div className="text-center p-8 animate-pulse">Loading...</div>
                    ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="menu-list">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                        {menus.map((menu, index) => (
                                            <Draggable key={menu.id} draggableId={menu.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex items-center justify-between p-3 bg-surface border border-border rounded-xl group hover:border-accent-primary/50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <GripVertical size={16} className="text-text-tertiary cursor-grab" />
                                                            <div>
                                                                <div className="font-bold text-text-primary">{menu.label}</div>
                                                                <div className="text-xs text-text-secondary font-mono">{menu.path}</div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(menu.id)}
                                                            className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 rounded-lg"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}
                </div>
            </div>
        </div>
    );
}
