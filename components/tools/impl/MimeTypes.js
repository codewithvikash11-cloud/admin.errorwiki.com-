"use client";

import React, { useState, useMemo } from 'react';
import { Search, FileType, Copy, Check } from 'lucide-react';

const COMMON_MIME_TYPES = [
    { ext: '.aac', mime: 'audio/aac', desc: 'AAC audio' },
    { ext: '.abw', mime: 'application/x-abiword', desc: 'AbiWord document' },
    { ext: '.arc', mime: 'application/x-freearc', desc: 'Archive document (multiple files)' },
    { ext: '.avif', mime: 'image/avif', desc: 'AVIF image' },
    { ext: '.avi', mime: 'video/x-msvideo', desc: 'AVI: Audio Video Interleave' },
    { ext: '.azw', mime: 'application/vnd.amazon.ebook', desc: 'Amazon Kindle eBook format' },
    { ext: '.bin', mime: 'application/octet-stream', desc: 'Any kind of binary data' },
    { ext: '.bmp', mime: 'image/bmp', desc: 'Windows OS/2 Bitmap Graphics' },
    { ext: '.bz', mime: 'application/x-bzip', desc: 'BZip archive' },
    { ext: '.bz2', mime: 'application/x-bzip2', desc: 'BZip2 archive' },
    { ext: '.cda', mime: 'application/x-cdf', desc: 'CD audio' },
    { ext: '.csh', mime: 'application/x-csh', desc: 'C-Shell script' },
    { ext: '.css', mime: 'text/css', desc: 'Cascading Style Sheets (CSS)' },
    { ext: '.csv', mime: 'text/csv', desc: 'Comma-separated values (CSV)' },
    { ext: '.doc', mime: 'application/msword', desc: 'Microsoft Word' },
    { ext: '.docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', desc: 'Microsoft Word (OpenXML)' },
    { ext: '.eot', mime: 'application/vnd.ms-fontobject', desc: 'MS Embedded OpenType fonts' },
    { ext: '.epub', mime: 'application/epub+zip', desc: 'Electronic publication (EPUB)' },
    { ext: '.gz', mime: 'application/gzip', desc: 'GZip Compressed Archive' },
    { ext: '.gif', mime: 'image/gif', desc: 'Graphics Interchange Format (GIF)' },
    { ext: '.htm, .html', mime: 'text/html', desc: 'HyperText Markup Language (HTML)' },
    { ext: '.ico', mime: 'image/vnd.microsoft.icon', desc: 'Icon format' },
    { ext: '.ics', mime: 'text/calendar', desc: 'iCalendar format' },
    { ext: '.jar', mime: 'application/java-archive', desc: 'Java Archive (JAR)' },
    { ext: '.jpeg, .jpg', mime: 'image/jpeg', desc: 'JPEG images' },
    { ext: '.js', mime: 'text/javascript', desc: 'JavaScript' },
    { ext: '.json', mime: 'application/json', desc: 'JSON format' },
    { ext: '.jsonld', mime: 'application/ld+json', desc: 'JSON-LD format' },
    { ext: '.mid, .midi', mime: 'audio/midi', desc: 'Musical Instrument Digital Interface (MIDI)' },
    { ext: '.mjs', mime: 'text/javascript', desc: 'JavaScript module' },
    { ext: '.mp3', mime: 'audio/mpeg', desc: 'MP3 audio' },
    { ext: '.mp4', mime: 'video/mp4', desc: 'MP4 video' },
    { ext: '.mpeg', mime: 'video/mpeg', desc: 'MPEG Video' },
    { ext: '.mpkg', mime: 'application/vnd.apple.installer+xml', desc: 'Apple Installer Package' },
    { ext: '.odp', mime: 'application/vnd.oasis.opendocument.presentation', desc: 'OpenDocument presentation document' },
    { ext: '.ods', mime: 'application/vnd.oasis.opendocument.spreadsheet', desc: 'OpenDocument spreadsheet document' },
    { ext: '.odt', mime: 'application/vnd.oasis.opendocument.text', desc: 'OpenDocument text document' },
    { ext: '.oga', mime: 'audio/ogg', desc: 'OGG audio' },
    { ext: '.ogv', mime: 'video/ogg', desc: 'OGG video' },
    { ext: '.ogx', mime: 'application/ogg', desc: 'OGG' },
    { ext: '.opus', mime: 'audio/opus', desc: 'Opus audio' },
    { ext: '.otf', mime: 'font/otf', desc: 'OpenType font' },
    { ext: '.png', mime: 'image/png', desc: 'Portable Network Graphics' },
    { ext: '.pdf', mime: 'application/pdf', desc: 'Adobe Portable Document Format (PDF)' },
    { ext: '.php', mime: 'application/x-httpd-php', desc: 'Hypertext Preprocessor (Personal Home Page)' },
    { ext: '.ppt', mime: 'application/vnd.ms-powerpoint', desc: 'Microsoft PowerPoint' },
    { ext: '.pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', desc: 'Microsoft PowerPoint (OpenXML)' },
    { ext: '.rar', mime: 'application/vnd.rar', desc: 'RAR archive' },
    { ext: '.rtf', mime: 'application/rtf', desc: 'Rich Text Format (RTF)' },
    { ext: '.sh', mime: 'application/x-sh', desc: 'Bourne shell script' },
    { ext: '.svg', mime: 'image/svg+xml', desc: 'Scalable Vector Graphics (SVG)' },
    { ext: '.tar', mime: 'application/x-tar', desc: 'Tape Archive (TAR)' },
    { ext: '.tif, .tiff', mime: 'image/tiff', desc: 'Tagged Image File Format (TIFF)' },
    { ext: '.ts', mime: 'video/mp2t', desc: 'MPEG transport stream' },
    { ext: '.ttf', mime: 'font/ttf', desc: 'TrueType Font' },
    { ext: '.txt', mime: 'text/plain', desc: 'Text, (generally ASCII or ISO 8859-n)' },
    { ext: '.vsd', mime: 'application/vnd.visio', desc: 'Microsoft Visio' },
    { ext: '.wav', mime: 'audio/wav', desc: 'Waveform Audio Format' },
    { ext: '.weba', mime: 'audio/webm', desc: 'WEBM audio' },
    { ext: '.webm', mime: 'video/webm', desc: 'WEBM video' },
    { ext: '.webp', mime: 'image/webp', desc: 'WEBP image' },
    { ext: '.woff', mime: 'font/woff', desc: 'Web Open Font Format (WOFF)' },
    { ext: '.woff2', mime: 'font/woff2', desc: 'Web Open Font Format (WOFF)' },
    { ext: '.xhtml', mime: 'application/xhtml+xml', desc: 'XHTML' },
    { ext: '.xls', mime: 'application/vnd.ms-excel', desc: 'Microsoft Excel' },
    { ext: '.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', desc: 'Microsoft Excel (OpenXML)' },
    { ext: '.xml', mime: 'application/xml', desc: 'XML' },
    { ext: '.xul', mime: 'application/vnd.mozilla.xul+xml', desc: 'XUL' },
    { ext: '.zip', mime: 'application/zip', desc: 'ZIP archive' },
    { ext: '.3gp', mime: 'video/3gpp', desc: '3GPP audio/video container' },
    { ext: '.3g2', mime: 'video/3gpp2', desc: '3GPP2 audio/video container' },
    { ext: '.7z', mime: 'application/x-7z-compressed', desc: '7-zip archive' },
];

export default function MimeTypes() {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(null);

    const filteredList = useMemo(() => {
        return COMMON_MIME_TYPES.filter(item =>
            item.ext.toLowerCase().includes(search.toLowerCase()) ||
            item.mime.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by extension (e.g., .json) or type (e.g., application/json)..."
                    className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-4 text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all font-medium"
                />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredList.map((item, index) => (
                    <div key={index} className="bg-surface border border-border rounded-xl p-4 hover:border-accent-primary/30 transition-all group flex flex-col gap-3 relative">
                        <div className="flex justify-between items-start">
                            <div className="bg-surface-highlight px-2 py-1 rounded text-xs font-mono font-bold text-accent-primary">
                                {item.ext}
                            </div>
                            <button
                                onClick={() => handleCopy(item.mime)}
                                className="text-text-tertiary hover:text-accent-primary transition-colors p-1"
                                title="Copy MIME Type"
                            >
                                {copied === item.mime ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>

                        <div>
                            <div className="text-sm font-bold text-text-primary break-all font-mono mb-1">
                                {item.mime}
                            </div>
                            <div className="text-xs text-text-secondary line-clamp-2">
                                {item.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredList.length === 0 && (
                <div className="text-center py-20 bg-surface/30 border border-border dashed border-2 rounded-2xl">
                    <p className="text-text-secondary font-medium">No MIME types found.</p>
                </div>
            )}
        </div>
    );
}
