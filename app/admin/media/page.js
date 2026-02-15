'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, Loader2, RefreshCw, Copy, ExternalLink } from 'lucide-react';
import { getFiles, uploadFile, deleteFile } from '@/lib/actions/media';
import { toast } from 'sonner';

export default function MediaPage() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setLoading(true);
        const data = await getFiles();
        setFiles(data);
        setLoading(false);
    };

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        const res = await uploadFile(formData);

        if (res.success) {
            toast.success('File uploaded successfully');
            loadFiles();
            if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
            toast.error(res.error || 'Upload failed');
            // If error is permission related path
            if (res.error?.includes('scope')) {
                toast.error("Check API Key permissions (storage.write)");
            }
        }
        setUploading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this file?')) return;

        const res = await deleteFile(id);
        if (res.success) {
            toast.success('File deleted');
            loadFiles(); // Refresh
        } else {
            toast.error('Failed to delete');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('URL copied to clipboard');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Media Library</h1>
                    <p className="text-text-secondary">Manage images and uploads.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={loadFiles}
                        className="p-2 hover:bg-surface-hover rounded-xl text-text-secondary transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <div className="relative">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleUpload}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                            {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-pulse">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-square bg-surface-card rounded-xl"></div>
                    ))}
                </div>
            ) : files.length === 0 ? (
                <div className="text-center py-20 bg-surface-card border border-border-primary rounded-2xl border-dashed">
                    <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4 text-text-secondary">
                        <ImageIcon size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-1">No media found</h3>
                    <p className="text-text-secondary mb-6">Upload images to use them in your posts.</p>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-brand-primary font-bold hover:underline"
                    >
                        Upload your first image
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map((file) => (
                        <div key={file.id} className="group relative bg-surface-card border border-border-primary rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="aspect-square bg-surface-hover relative overflow-hidden">
                                {/* Next.js Image would be better, but we need configured domains. Using img for admin panel is safe/easier for now */}
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => window.open(file.url, '_blank')}
                                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-colors"
                                        title="Open Original"
                                    >
                                        <ExternalLink size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file.id)}
                                        className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium text-text-primary truncate" title={file.name}>{file.name}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-[10px] text-text-secondary uppercase tracking-wider">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(file.url)}
                                        className="text-[10px] flex items-center gap-1 text-brand-primary hover:text-brand-primary/80 font-medium"
                                    >
                                        <Copy size={10} /> Copy URL
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
