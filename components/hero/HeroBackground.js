import React from 'react';

const HeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0a0a0a]">
            {/* Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>

            {/* Radial Gradient Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[100px] mix-blend-screen" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
        </div>
    );
};

export default HeroBackground;
