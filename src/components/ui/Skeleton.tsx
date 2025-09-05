import React from 'react';
import '../../styles/animated-design.css';

interface SkeletonProps {
    className?: string;
    style?: React.CSSProperties;
    variant?: 'rectangular' | 'circular' | 'rounded' | 'text';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({ 
    className = '', 
    style,
    variant = 'rectangular',
    width,
    height,
    animation = 'wave'
}) => {
    const getVariantStyles = (): React.CSSProperties => {
        const baseStyles: React.CSSProperties = {
            width,
            height
        };

        switch (variant) {
            case 'circular':
                return {
                    ...baseStyles,
                    borderRadius: '50%',
                    width: width || height || '40px',
                    height: height || width || '40px'
                };
            case 'rounded':
                return {
                    ...baseStyles,
                    borderRadius: 'var(--animated-radius-lg)'
                };
            case 'text':
                return {
                    ...baseStyles,
                    height: height || '1.2em',
                    borderRadius: 'var(--animated-radius-sm)'
                };
            case 'rectangular':
            default:
                return {
                    ...baseStyles,
                    borderRadius: 'var(--animated-radius-md)'
                };
        }
    };

    const animationClass = animation !== 'none' ? `skeleton-${animation}` : '';
    
    return (
        <div 
            className={`skeleton ${animationClass} ${className}`}
            style={{...getVariantStyles(), ...style}}
            role="progressbar"
            aria-label="Loading content"
        />
    );
};

export default Skeleton;
