"use client";

import React, { useState, useEffect } from 'react';
import { mediaService } from '@/lib/media';
import { Upload, Trash2, Link as LinkIcon, Image as ImageIcon, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MediaPage() {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const data = await mediaService.listFiles(50);
            setFiles(data);
        } catch (error) {
            console.error("Fetch Media Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            await mediaService.uploadFile(file);
            await fetchMedia(); // Refresh list
        } catch (error) {
            alert("Upload failed: " + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (fileId) => {
        if (!confirm("Are you sure? This cannot be undone.")) return;
        try {
            await mediaService.deleteFile(fileId);
            setFiles(files.filter(f => f.$id !== fileId));
        } catch (error) {
            alert("Delete failed: " + error.message);
        }
    };

    const copyUrl = (id) => {
        const url = mediaService.getFileView(id);
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight mb-2">Media Library</h1>
                    <p className="text-text-secondary">Manage and upload images/assets for your content.</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleUpload}
                        className="hidden"
                        id="media-upload"
                        accept="image/*,application/pdf"
                        disabled={isUploading}
                    />
                    <label
                        htmlFor="media-upload"
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 bg-accent-primary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:scale-[1.02] transition-transform cursor-pointer",
                            isUploading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isUploading ? (
                            <span className="animate-spin">⌛</span>
                        ) : (
                            <Upload size={18} />
                        )}
                        {isUploading ? 'Uploading...' : 'Upload File'}
                    </label>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {isLoading ? (
                    [1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="aspect-square bg-panel border border-border rounded-xl animate-pulse" />
                    ))
                ) : files.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-text-tertiary bg-panel border-dashed border-2 border-border rounded-2xl">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No media files found.</p>
                    </div>
                ) : (
                    files.map(file => (
                        <div key={file.$id} className="group relative bg-panel border border-border rounded-xl aspect-square flex flex-col overflow-hidden hover:border-accent-primary/50 transition-colors">
                            {/* Preview */}
                            <div className="flex-1 bg-surface-highlight flex items-center justify-center overflow-hidden">
                                {file.mimeType.startsWith('image/') ? (
                                    <img
                                        src={mediaService.getFileView(file.$id)}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <FileIcon mime={file.mimeType} />
                                )}
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => copyUrl(file.$id)}
                                    className="p-2 bg-white/10 text-white hover:bg-accent-primary rounded-lg backdrop-blur-sm transition-colors"
                                    title="Copy URL"
                                >
                                    {copiedId === file.$id ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(file.$id)}
                                    className="p-2 bg-white/10 text-white hover:bg-red-500 rounded-lg backdrop-blur-sm transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Footer Info */}
                            <div className="p-2 bg-panel border-t border-border text-xs truncate">
                                <p className="font-bold text-text-primary truncate">{file.name}</p>
                                <p className="text-text-tertiary">{(file.sizeOriginal / 1024).toFixed(1)} KB</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function FileIcon({ mime }) {
    // Basic icon fallback
    return (
        <div className="text-text-tertiary flex flex-col items-center">
            <Files size={32} strokeWidth={1} />
            <span className="text-[10px] mt-1 uppercase">{mime.split('/')[1]}</span>
        </div>
    );
}
