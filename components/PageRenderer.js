'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

export default function PageRenderer({ content }) {
    let data = {};
    try {
        data = typeof content === 'string' ? JSON.parse(content) : content;
    } catch (e) {
        // Content is plain text/markdown?
        return <div className="prose prose-invert max-w-4xl mx-auto py-12 px-4" dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // Check for "Template" structure
    const components = [];

    // Hero Section
    if (data.hero) {
        components.push(
            <HeroSection
                key="hero"
                title={data.hero.title}
                subtitle={data.hero.description || data.hero.subtitle} // Handle various keys
                ctaPromise={data.hero.ctaPrimary?.label || data.hero.ctaPromise}
                ctaLink={data.hero.ctaPrimary?.href || data.hero.ctaLink}
            />
        );
    }

    // Features Section
    if (data.features) {
        components.push(
            <FeaturesSection
                key="features"
                customTitle={data.features.title}
                customItems={data.features.items}
            />
        );
    }

    // Generic "Sections" list
    if (data.sections && Array.isArray(data.sections)) {
        data.sections.forEach((section, idx) => {
            if (section.type === 'text') {
                components.push(
                    <div key={idx} className="container mx-auto px-4 py-8 prose prose-invert max-w-4xl">
                        <h2>{section.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    </div>
                );
            }
            // Add more types here
        });
    }

    // Fallback if structured data is empty but we matched valid JSON
    if (components.length === 0 && !data.title) {
        return <div className="container mx-auto py-20 text-center">Empty Page Configuration</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            {components}

            {/* If simple page title/desc only */}
            {!data.hero && !data.features && !data.sections && (
                <div className="container mx-auto px-4 py-20 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                    <p className="text-xl text-text-secondary">{data.description}</p>
                </div>
            )}
        </div>
    );
}
