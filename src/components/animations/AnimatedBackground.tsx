import React from 'react';

// Smooth ambient animated background
// Uses CSS classes defined in animated-design.css
const AnimatedBackground: React.FC = () => {
    return (
        <div className="ts-background" aria-hidden="true">
            <div className="ts-blob ts-blob-a" />
            <div className="ts-blob ts-blob-b" />
            <div className="ts-blob ts-blob-c" />
            <div className="ts-blob ts-blob-d" />
            <div className="ts-noise" />
        </div>
    );
};

export default AnimatedBackground;