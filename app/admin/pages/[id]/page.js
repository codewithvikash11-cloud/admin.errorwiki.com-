'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import PageEditor from '@/components/PageEditor';
import { getPage } from '@/lib/actions/pages';

export default function EditPage({ params }) {
    const { id } = React.use(params); // Next.js 15+ param unwrapping
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPage();
    }, [id]);

    const loadPage = async () => {
        setLoading(true);
        const data = await getPage(id);
        if (!data) {
            notFound();
        }
        setPage(data);
        setLoading(false);
    };

    if (loading) {
        return <div className="p-8 text-center text-text-secondary">Loading page editor...</div>;
    }

    if (!page) return null; // handled by notFound

    return <PageEditor initialData={page} />;
}
