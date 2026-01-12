"use client";

import Logo from './Logo';

// Re-export the main logo as RovioTechLogo for compatibility
// This ensures alignment across the app
export default function RovioTechLogo(props) {
    return <Logo {...props} />;
}
