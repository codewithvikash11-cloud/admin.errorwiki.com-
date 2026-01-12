"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Code,
    Terminal,
    BookOpen,
    Zap,
    ChevronLeft,
    ChevronRight,
    Layout,

    Globe,
    Network,
    Briefcase,
    FileJson,
    ShieldCheck,
    ScrollText,
    GraduationCap,
    Home,

} from 'lucide-react';
import {
    GrammarIcon,
    RewriteIcon,
    PlagiarismIcon,
    DocumentsIcon,
    HistoryIcon,
    DocsIcon,
    SheetsIcon
} from '@/components/ui/PremiumIcons';

export default function SidebarToolbox() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        // Explore Section
        {
            name: "Learn",
            href: "/learn",
            icon: GraduationCap,
            color: "text-accent-primary",
            desc: "Academy"
        },
        {
            name: "Tools Hub",
            href: "/tools",
            icon: Briefcase,
            color: "text-accent-primary",
            desc: "Utilities"
        },
        {
            name: "API Tester",
            href: "/api-tester",
            icon: Network,
            color: "text-accent-primary",
            desc: "REST Client"
        },
        {
            name: "Compiler",
            href: "/compiler",
            icon: Code,
            color: "text-accent-primary",
            desc: "Online IDE"
        },
        {
            name: "Errors",
            href: "/errors",
            icon: Terminal,
            color: "text-accent-primary",
            desc: "Fix Database"
        },
        {
            name: "Languages",
            href: "/languages",
            icon: Globe,
            color: "text-accent-primary",
            desc: "Docs & Syntax"
        },
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: Layout,
            color: "text-accent-warning", // Keep warning for dashboard/personal
            desc: "Contributor"
        },

        // Writing Section
        {
            name: "Docs Editor",
            href: "/docs",
            icon: DocsIcon,
            color: "text-accent-primary",
            desc: "Rich Text",
            hasCustomIcon: true
        },
        {
            name: "Sheets Editor",
            href: "/sheets",
            icon: SheetsIcon,
            color: "text-accent-primary",
            desc: "Spreadsheet",
            hasCustomIcon: true
        },
        {
            name: "Grammar",
            href: "/grammar",
            icon: GrammarIcon,
            color: "text-accent-primary",
            desc: "AI Correction",
            hasCustomIcon: true
        },
        {
            name: "Rewrite",
            href: "/rewrite",
            icon: RewriteIcon,
            color: "text-accent-primary",
            desc: "Paraphraser",
            hasCustomIcon: true
        },
        {
            name: "Plagiarism",
            href: "/plagiarism",
            icon: PlagiarismIcon,
            color: "text-accent-primary",
            desc: "Originality Check",
            hasCustomIcon: true
        },
        {
            name: "Saved Docs",
            href: "/documents",
            icon: DocumentsIcon,
            color: "text-accent-primary",
            desc: "My Library",
            hasCustomIcon: true
        },
        {
            name: "History",
            href: "/history",
            icon: HistoryIcon,
            color: "text-accent-primary",
            desc: "Activity Log",
            hasCustomIcon: true
        },

        // Productivity Section
        {
            name: "Log Analyzer",
            href: "/log-analyzer",
            icon: ScrollText,
            color: "text-accent-primary",
            desc: "AI Debugger"
        },
        {
            name: "Code Reviewer",
            href: "/code-reviewer",
            icon: ShieldCheck,
            color: "text-accent-primary",
            desc: "Quality Audit"
        },
        {
            name: "Snippets",
            href: "/snippets",
            icon: BookOpen,
            color: "text-accent-primary",
            desc: "Code Library"
        }
    ];

    return (
        <>
            {/* Desktop Rail / Sidebar */}
            <aside
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
                    ${isOpen ? 'w-64' : 'w-20'} 
                    glass-strong shadow-2xl hidden lg:flex flex-col pt-20 pb-4
                `}
            >
                {/* Scrollable Content Container */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none py-4 space-y-6">

                    {/* Explicit Home Link */}
                    <div className="px-2 w-full flex flex-col items-center lg:items-stretch">
                        <SidebarItem
                            item={{
                                name: "Home",
                                href: "/",
                                icon: Home,
                                color: "text-accent-success", // Use semantic color
                                desc: "Start Here"
                            }}
                            isOpen={isOpen}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                        />
                    </div>

                    {/* Explore Section */}
                    <div>
                        <div className={`px-6 mb-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-text-tertiary mb-1 whitespace-nowrap">Explore</h2>
                            <div className="h-0.5 w-6 bg-accent-info rounded-full shadow-[0_0_8px_var(--accent-info)]"></div>
                        </div>

                        <nav className="space-y-1 px-2 flex flex-col items-center lg:items-stretch">
                            {menuItems.filter(i => !['Log Analyzer', 'Code Reviewer', 'Snippets', 'Dev Utilities', 'Grammar', 'Rewrite', 'Plagiarism', 'Saved Docs', 'History', 'Docs Editor', 'Sheets Editor'].includes(i.name)).map((item) => (
                                <SidebarItem key={item.href} item={item} isOpen={isOpen} pathname={pathname} setIsOpen={setIsOpen} />
                            ))}
                        </nav>
                    </div>

                    {/* Writing Section */}
                    <div>
                        <div className={`px-6 mb-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-text-tertiary mb-1 whitespace-nowrap">Writing AI</h2>
                            <div className="h-0.5 w-6 bg-accent-primary rounded-full shadow-[0_0_8px_var(--accent-primary)]"></div>
                        </div>

                        <nav className="space-y-1 px-2 flex flex-col items-center lg:items-stretch">
                            {menuItems.filter(i => ['Docs Editor', 'Sheets Editor', 'Grammar', 'Rewrite', 'Plagiarism', 'Saved Docs', 'History'].includes(i.name)).map((item) => (
                                <SidebarItem key={item.href} item={item} isOpen={isOpen} pathname={pathname} setIsOpen={setIsOpen} />
                            ))}
                        </nav>
                    </div>

                    {/* Productivity Section */}
                    <div>
                        <div className={`px-6 mb-2 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.15em] text-text-tertiary mb-1 whitespace-nowrap">Productivity</h2>
                            <div className="h-0.5 w-6 bg-accent-primary rounded-full shadow-[0_0_8px_var(--accent-primary)]"></div>
                        </div>

                        <nav className="space-y-1 px-2 flex flex-col items-center lg:items-stretch">
                            {menuItems.filter(i => ['Log Analyzer', 'Code Reviewer', 'Snippets'].includes(i.name)).map((item) => (
                                <SidebarItem key={item.href} item={item} isOpen={isOpen} pathname={pathname} setIsOpen={setIsOpen} />
                            ))}
                        </nav>
                    </div>
                </div>

            </aside>

            {/* Overlay for mobile - Only if we trigger via another mobile button */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

function SidebarItem({ item, isOpen, pathname, setIsOpen }) {
    // Improved Active Logic: Exact match for root, startsWith for sub-pages
    const isActive = item.href === '/'
        ? pathname === '/'
        : pathname.startsWith(item.href);

    return (
        <div className="relative group/item w-full flex justify-center lg:justify-start">
            <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                    relative flex items-center transition-all duration-200 group/link
                    ${isOpen
                        ? 'w-full p-3 rounded-xl gap-3 border border-transparent'
                        : 'w-10 h-10 justify-center rounded-xl'
                    }
                    ${isActive
                        ? isOpen
                            ? 'bg-accent-primary/10 border-accent-primary/20 shadow-lg'
                            : 'bg-accent-primary text-white shadow-[0_0_15px_var(--accent-glow)]'
                        : 'hover:bg-surface-highlight text-text-secondary hover:text-text-primary'
                    }
                `}
            >
                {/* Icon Container */}
                <div className={`
                    relative z-10 transition-transform duration-300 ease-out group-hover/link:scale-110
                    ${isActive && !isOpen ? 'text-white' : ''}
                    ${isActive && isOpen ? 'text-accent-primary' : ''}
                `}>
                    {item.hasCustomIcon ? (
                        <item.icon size={20} isActive={isActive} className={isActive ? 'drop-shadow-md' : ''} />
                    ) : (
                        <item.icon size={20} className={isActive ? 'drop-shadow-md' : ''} />
                    )}
                </div>

                {/* Expanded Text */}
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100 ml-0' : 'w-0 opacity-0'}`}>
                    <div className="flex flex-col items-start text-left">
                        <p className={`text-sm font-bold whitespace-nowrap tracking-wide ${isActive ? 'text-accent-primary' : 'text-text-secondary group-hover/link:text-text-primary'}`}>
                            {item.name}
                        </p>
                        <p className="text-[10px] text-text-tertiary font-medium whitespace-nowrap group-hover/link:text-text-secondary transition-colors">{item.desc}</p>
                    </div>
                </div>

                {/* Active Indicator Line (Expanded Only) */}
                {isOpen && isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-primary rounded-r-full shadow-[0_0_8px_var(--accent-primary)]"></div>
                )}
            </Link>

            {/* Tooltip (Collapsed Only) */}
            {!isOpen && (
                <div className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                    glass-strong rounded-lg shadow-xl 
                    opacity-0 invisible -translate-x-2 
                    group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 
                    transition-all duration-200 z-50 whitespace-nowrap pointer-events-none
                ">
                    <p className="text-xs font-bold text-text-primary mb-0.5">{item.name}</p>
                    <p className="text-[10px] text-text-tertiary">{item.desc}</p>
                    {/* Arrow */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-panel border-l border-b border-border rotate-45"></div>
                </div>
            )}
        </div>
    );
}
