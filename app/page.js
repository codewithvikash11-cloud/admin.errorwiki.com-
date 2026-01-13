import React from 'react';
import { getHomepageData } from '@/lib/actions/homepage';
import HeroSection from '@/components/home/HeroSection';
import Navbar from '@/components/Navbar'; // We'll assume Navbar can handle public state or we pass props

// Placeholder for other sections
import FeaturesSection from '@/components/home/FeaturesSection';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic'; // Ensure we fetch fresh data

export default async function Home() {
  const data = await getHomepageData();
  const hero = data?.hero || {};
  const features = data?.features || {};

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#008000] selection:text-white">
      <Navbar hideLinks={false} />

      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
        ctaPromise={hero.ctaPromise}
        ctaLink={hero.ctaLink}
      />

      {features.show && (
        <section className="py-24 bg-surface/50 border-t border-border">
          <div className="container px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-black mb-4">{features.title}</h2>
            </div>
            {/* We might need to map dynamic features if FeaturesSection supports it. 
                 For now, just render FeaturesSection as is, or pass props if I update it.
             */}
            <FeaturesSection customTitle={features.title} customItems={features.items} />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

