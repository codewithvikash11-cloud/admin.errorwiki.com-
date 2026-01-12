import React from 'react';

const GradientDefs = () => (
    <defs>
        <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="grad-pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="grad-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
);

const BaseIcon = ({ children, isActive, className = "" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 lg:w-7 lg:h-7 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110' : 'opacity-80 hover:opacity-100'} ${className}`}
    >
        <GradientDefs />
        {children}
    </svg>
);

export const HomeIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M3 12L12 3L21 12" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V12H15V21" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="5" y="14" width="14" height="8" rx="2" stroke="none" fill={isActive ? "url(#grad-blue)" : "transparent"} fillOpacity="0.1" />
    </BaseIcon>
);

export const ErrorsIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={isActive ? "url(#grad-pink)" : "currentColor"} strokeWidth="2" />
        <path d="M12 8V12" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill={isActive ? "#ec4899" : "currentColor"} />
        <circle cx="12" cy="12" r="6" stroke="none" fill={isActive ? "url(#grad-pink)" : "transparent"} fillOpacity="0.1" />
    </BaseIcon>
);

export const LanguagesIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M7 8L3 12L7 16" stroke={isActive ? "url(#grad-cyan)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 8L21 12L17 16" stroke={isActive ? "url(#grad-cyan)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 4L10 20" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
        <rect x="2" y="4" width="20" height="16" rx="4" stroke="none" fill={isActive ? "url(#grad-cyan)" : "transparent"} fillOpacity="0.05" />
    </BaseIcon>
);

export const EditorIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M12 20H21" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 3.5C17.3284 2.67157 18.6716 2.67157 19.5 3.5C20.3284 4.32843 20.3284 5.67157 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke={isActive ? "url(#grad-pink)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 6L18 10" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
    </BaseIcon>
);

export const BlogsIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
        <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke={isActive ? "url(#grad-cyan)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 7H15" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
        <path d="M9 11H13" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" />
    </BaseIcon>
);

export const SettingsIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <circle cx="12" cy="12" r="3" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" />
        <path d="M19.4 15C19.8 14.1 20 13 20 12C20 11 19.8 9.9 19.4 9L21 6L18 4L16 5.6C15.1 5.2 14.1 5 13 5L12 3H12L11 5C9.9 5 8.9 5.2 8 5.6L6 4L3 6L4.6 9C4.2 9.9 4 11 4 12C4 13 4.2 14.1 4.6 15L3 18L6 20L8 18.4C8.9 18.8 9.9 19 11 19L12 21H12L13 19C14.1 19 15.1 18.8 16 18.4L18 20L21 18L19.4 15Z" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const TerminalIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M4 17L10 11L4 5" stroke={isActive ? "url(#grad-cyan)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 19H20" stroke={isActive ? "url(#grad-pink)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const GrammarIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M12 19l7-7 2 2-9 9-5-5 2-2 3 3z" stroke={isActive ? "url(#grad-green)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 4l4 4-2 2-4-4 2-2z" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8l-6 6-1 5 5-1 6-6" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const RewriteIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8c-2 0-3.9.8-5.3 2.1l-1.4 1.4" stroke={isActive ? "url(#grad-cyan)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.3 7.5V3.8M5.3 7.5h3.7" stroke={isActive ? "url(#grad-cyan)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 10l-4 4" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 10l4 4" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const PlagiarismIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={isActive ? "url(#grad-pink)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={isActive ? "url(#grad-pink)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const DocumentsIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke={isActive ? "url(#grad-purple)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13H8" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17H8" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 9H8" stroke={isActive ? "url(#grad-blue)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const HistoryIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <circle cx="12" cy="12" r="10" stroke={isActive ? "url(#grad-orange)" : "currentColor"} strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke={isActive ? "url(#grad-orange)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const DocsIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={isActive ? "url(#grad-doc)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke={isActive ? "url(#grad-doc)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12h8" stroke={isActive ? "url(#grad-doc)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16h8" stroke={isActive ? "url(#grad-doc)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8h4" stroke={isActive ? "url(#grad-doc)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);

export const SheetsIcon = ({ isActive }) => (
    <BaseIcon isActive={isActive}>
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke={isActive ? "url(#grad-sheet)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 4v16" stroke={isActive ? "url(#grad-sheet)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 4v16" stroke={isActive ? "url(#grad-sheet)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12h20" stroke={isActive ? "url(#grad-sheet)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BaseIcon>
);
