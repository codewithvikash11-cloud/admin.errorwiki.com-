'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import MenuForm from '@/components/MenuForm';
import { getMenus } from '@/lib/actions/menus';

export default function EditMenuPage({ params }) {
    const { id } = React.use(params);
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMenu();
    }, [id]);

    const loadMenu = async () => {
        setLoading(true);
        // We don't have getMenu single fetcher yet in actions, let's add it or fetch all and find.
        // Fetching all is fine for now as menus are small.
        const allMenus = await getMenus('all');
        const found = allMenus.find(m => m.id === id);

        if (!found) {
            notFound();
        }
        setMenu(found);
        setLoading(false);
    };

    if (loading) {
        return <div className="p-8 text-center text-text-secondary">Loading menu editor...</div>;
    }

    if (!menu) return null;

    return <MenuForm initialData={menu} />;
}
