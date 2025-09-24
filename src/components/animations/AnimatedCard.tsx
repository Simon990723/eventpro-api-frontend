import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import React, { type ReactNode, type CSSProperties } from 'react';

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    delay?: number;
    hoverScale?: number;
    tapScale?: number;
    gradient?: boolean;
    glow?: boolean;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(({
    children,
    className = '',
    delay = 0,
    hoverScale = 1.03,
    tapScale = 0.98,
    gradient = false,
    glow = false,
    style,
    ...props
}, ref) => {
    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay,
                ease: "easeOut"
            }
        }
    };

    const combinedClassName = `
        ${className} 
        ${gradient ? 'gradient-animated' : ''} 
        ${glow ? 'glow-effect' : ''}
    `.trim();

    const mergedStyle: CSSProperties | undefined = {
        transformOrigin: 'center',
        pointerEvents: 'auto',
        ...(style as CSSProperties)
    };

    return (
        <motion.div
            ref={ref}
            className={combinedClassName}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: hoverScale, y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
            whileTap={{ scale: tapScale, transition: { duration: 0.1, ease: 'easeOut' } }}
            style={mergedStyle}
            {...props}
        >
            {children}
        </motion.div>
    );
});

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;