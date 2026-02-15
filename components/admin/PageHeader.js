'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PageHeader({ title, description, actions }) {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(Boolean);

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                {/* Breadcrumbs */}
                <div className="flex items-center text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
                    {paths.map((path, index) => (
                        <React.Fragment key={path}>
                            {index > 0 && <ChevronRight size={12} className="mx-2" />}
                            <span className={index === paths.length - 1 ? 'text-white' : ''}>
                                {path.replace(/-/g, ' ')}
                            </span>
                        </React.Fragment>
                    ))}
                </div>

                <h1 className="text-3xl font-black text-white tracking-tight">{title}</h1>
                {description && <p className="text-gray-400 mt-1">{description}</p>}
            </div>

            {actions && (
                <div className="flex items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
