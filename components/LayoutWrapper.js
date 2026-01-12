"use client";

import React, { useState } from 'react';
import Footer from './Footer';

const LayoutWrapper = ({ children }) => {
    // LayoutWrapper now only handles Page Content Container + Footer
    // Global Shell (in layout.js) handles Navbar & Sidebar

    return (
        <div className="flex flex-col min-h-full">
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default LayoutWrapper;
