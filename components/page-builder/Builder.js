'use client';

import React, { useState } from 'react';
import { Plus, ChevronUp, ChevronDown, Trash2, Edit2, GripVertical, X, Check } from 'lucide-react';
import { toast } from 'sonner';

const SECTION_TYPES = [
    { type: 'hero', label: 'Hero Section', icon: 'LayoutTemplate' },
    { type: 'features', label: 'Features Grid', icon: 'Grid' },
    { type: 'rich-text', label: 'Rich Text', icon: 'Type' },
    { type: 'faq', label: 'FAQ Accordion', icon: 'HelpCircle' }
];

export default function Builder({ sections, setSections }) {
    const [editingIndex, setEditingIndex] = useState(null);

    const addSection = (type) => {
        const newSection = {
            id: crypto.randomUUID(),
            type,
            data: getDefaultData(type)
        };
        setSections([...sections, newSection]);
        setEditingIndex(sections.length); // Auto-open editor
    };

    const updateSection = (index, newData) => {
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], data: newData };
        setSections(newSections);
    };

    const removeSection = (index) => {
        if (!confirm('Delete this section?')) return;
        const newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
        setEditingIndex(null);
    };

    const moveSection = (index, direction) => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === sections.length - 1) return;

        const newSections = [...sections];
        const temp = newSections[index];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        newSections[index] = newSections[targetIndex];
        newSections[targetIndex] = temp;
        setSections(newSections);
    };

    const getDefaultData = (type) => {
        switch (type) {
            case 'hero': return { title: 'Hero Title', subtitle: 'Subtitle goes here', ctaText: 'Get Started', ctaLink: '/' };
            case 'features': return { title: 'Our Features', items: [{ title: 'Feature 1', desc: 'Description' }] };
            case 'rich-text': return { content: '<p>Enter text...</p>' };
            case 'faq': return { title: 'Frequently Asked Questions', items: [{ question: 'Question?', answer: 'Answer.' }] };
            default: return {};
        }
    };

    return (
        <div className="space-y-6">
            {/* Add Section Bar */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-border-primary">
                <span className="text-xs font-bold uppercase text-text-secondary tracking-wider py-2 mr-2">Add Section:</span>
                {SECTION_TYPES.map(t => (
                    <button
                        key={t.type}
                        type="button"
                        onClick={() => addSection(t.type)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-hover hover:bg-brand-primary/10 hover:text-brand-primary border border-border-primary rounded-lg text-sm font-medium transition-all"
                    >
                        <Plus size={14} /> {t.label}
                    </button>
                ))}
            </div>

            {/* Sections List */}
            <div className="space-y-4">
                {sections.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-border-primary rounded-xl">
                        <p className="text-text-secondary">No sections yet. Add one above.</p>
                    </div>
                )}

                {sections.map((section, index) => (
                    <div key={section.id || index} className="group bg-surface-card border border-border-primary rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 bg-surface-hover/50 border-b border-border-primary/50">
                            <div className="flex items-center gap-3">
                                <span className="p-1.5 bg-surface-active rounded-md text-text-secondary cursor-move">
                                    <GripVertical size={14} />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded-full">
                                    {section.type}
                                </span>
                                <span className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                                    {section.data.title || 'Untitled Section'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button type="button" onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1.5 hover:bg-surface-active rounded-lg text-text-secondary disabled:opacity-30">
                                    <ChevronUp size={16} />
                                </button>
                                <button type="button" onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} className="p-1.5 hover:bg-surface-active rounded-lg text-text-secondary disabled:opacity-30">
                                    <ChevronDown size={16} />
                                </button>
                                <div className="w-px h-4 bg-border-primary mx-1" />
                                <button
                                    type="button"
                                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                                    className={`p-1.5 rounded-lg transition-colors ${editingIndex === index ? 'bg-brand-primary text-white' : 'hover:bg-surface-active text-text-secondary'}`}
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button type="button" onClick={() => removeSection(index)} className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-text-secondary">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Editor Body */}
                        {editingIndex === index && (
                            <div className="p-4 bg-surface-card">
                                <SectionEditor
                                    type={section.type}
                                    data={section.data}
                                    onChange={(newData) => updateSection(index, newData)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Sub-component for editing specific section types
function SectionEditor({ type, data, onChange }) {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    // Helper for array items (Features, FAQ)
    const handleArrayChange = (index, field, value, arrayName) => {
        const newArray = [...(data[arrayName] || [])];
        newArray[index] = { ...newArray[index], [field]: value };
        onChange({ ...data, [arrayName]: newArray });
    };

    const addArrayItem = (arrayName, defaultItem) => {
        onChange({ ...data, [arrayName]: [...(data[arrayName] || []), defaultItem] });
    };

    const removeArrayItem = (index, arrayName) => {
        const newArray = [...(data[arrayName] || [])];
        newArray.splice(index, 1);
        onChange({ ...data, [arrayName]: newArray });
    };

    if (type === 'hero') {
        return (
            <div className="space-y-4">
                <Input label="Title" value={data.title} onChange={v => handleChange('title', v)} />
                <Input label="Subtitle" value={data.subtitle} onChange={v => handleChange('subtitle', v)} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="CTA Text" value={data.ctaText} onChange={v => handleChange('ctaText', v)} />
                    <Input label="CTA Link" value={data.ctaLink} onChange={v => handleChange('ctaLink', v)} />
                </div>
                {/* Image Picker placeholder - ideally integrate Media Library here */}
                <Input label="Background Image URL" value={data.image} onChange={v => handleChange('image', v)} />
            </div>
        );
    }

    if (type === 'rich-text') {
        return (
            <div className="space-y-4">
                <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">HTML Content</label>
                <textarea
                    value={data.content}
                    onChange={e => handleChange('content', e.target.value)}
                    rows={6}
                    className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                />
            </div>
        );
    }

    if (type === 'features') {
        return (
            <div className="space-y-4">
                <Input label="Section Title" value={data.title} onChange={v => handleChange('title', v)} />

                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider">Features</label>
                    {(data.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start border border-border-primary p-2 rounded-lg">
                            <div className="flex-1 space-y-2">
                                <input
                                    placeholder="Title"
                                    value={item.title}
                                    onChange={e => handleArrayChange(i, 'title', e.target.value, 'items')}
                                    className="w-full bg-surface-hover border border-border-primary rounded-lg px-2 py-1 text-sm outline-none focus:border-brand-primary"
                                />
                                <input
                                    placeholder="Description"
                                    value={item.desc}
                                    onChange={e => handleArrayChange(i, 'desc', e.target.value, 'items')}
                                    className="w-full bg-surface-hover border border-border-primary rounded-lg px-2 py-1 text-sm outline-none focus:border-brand-primary"
                                />
                            </div>
                            <button type="button" onClick={() => removeArrayItem(i, 'items')} className="p-1 hover:bg-red-500/10 text-red-500 rounded"><Trash2 size={14} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('items', { title: 'New Feature', desc: '...' })} className="text-xs font-bold text-brand-primary hover:underline">+ Add Feature</button>
                </div>
            </div>
        );
    }

    if (type === 'faq') {
        return (
            <div className="space-y-4">
                <Input label="Section Title" value={data.title} onChange={v => handleChange('title', v)} />

                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider">Questions</label>
                    {(data.items || []).map((item, i) => (
                        <div key={i} className="flex gap-2 items-start border border-border-primary p-2 rounded-lg">
                            <div className="flex-1 space-y-2">
                                <input
                                    placeholder="Question"
                                    value={item.question}
                                    onChange={e => handleArrayChange(i, 'question', e.target.value, 'items')}
                                    className="w-full bg-surface-hover border border-border-primary rounded-lg px-2 py-1 text-sm outline-none focus:border-brand-primary"
                                />
                                <textarea
                                    placeholder="Answer"
                                    value={item.answer}
                                    onChange={e => handleArrayChange(i, 'answer', e.target.value, 'items')}
                                    rows={2}
                                    className="w-full bg-surface-hover border border-border-primary rounded-lg px-2 py-1 text-sm outline-none focus:border-brand-primary"
                                />
                            </div>
                            <button type="button" onClick={() => removeArrayItem(i, 'items')} className="p-1 hover:bg-red-500/10 text-red-500 rounded"><Trash2 size={14} /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('items', { question: '?', answer: '...' })} className="text-xs font-bold text-brand-primary hover:underline">+ Add Question</button>
                </div>
            </div>
        );
    }

    return <div>Unknown Section Type</div>;
}

const Input = ({ label, value, onChange }) => (
    <div>
        <label className="block text-xs font-bold uppercase text-text-secondary tracking-wider mb-2">{label}</label>
        <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-surface-hover border border-border-primary rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-all"
        />
    </div>
);
