import React from 'react';

// Recharts uses standard SVG, but for visual consistency in the tables, 
// we'll define a simple Check component using Lucide-react pattern.
const Check = ({ size = 16, color = 'currentColor', className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default Check;