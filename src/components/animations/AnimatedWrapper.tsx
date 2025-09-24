import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import React, { type CSSProperties } from 'react';

type AnimationType = 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'bounceIn' | 'staggerChildren';

interface AnimatedWrapperProps extends HTMLMotionProps<"div"> {
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    staggerDelay?: number;
}

const buildVariants = (
    type: AnimationType,
    delay: number,
    duration: number,
    staggerDelay: number
): Variants => {
    switch (type) {
        case 'fadeIn':
            return {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration, delay, ease: 'easeOut' } },
                exit: { opacity: 0, y: -20 }
            };
        case 'slideInLeft':
            return {
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration, delay, ease: 'easeOut' } },
                exit: { opacity: 0, x: -50 }
            };
        case 'slideInRight':
            return {
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration, delay, ease: 'easeOut' } },
                exit: { opacity: 0, x: 50 }
            };
        case 'scaleIn':
            return {
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: 'easeOut' } },
                exit: { opacity: 0, scale: 0.9 }
            };
        case 'bounceIn':
            return {
                hidden: { opacity: 0, scale: 0.3 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 400, damping: 10 }
                },
                exit: { opacity: 0, scale: 0.3 }
            };
        case 'staggerChildren':
            return {
                hidden: {},
                visible: { transition: { staggerChildren: staggerDelay } },
                exit: {}
            };
        default:
            return { hidden: {}, visible: {}, exit: {} };
    }
};

const AnimatedWrapper = React.forwardRef<HTMLDivElement, AnimatedWrapperProps>(({
                                                                                    children,
                                                                                    animation = 'fadeIn',
                                                                                    delay = 0,
                                                                                    duration = 0.6,
                                                                                    staggerDelay = 0.1,
                                                                                    style,
                                                                                    className,
                                                                                    ...props
                                                                                }, ref) => {
    const variants = buildVariants(animation, delay, duration, staggerDelay);

    const mergedStyle: CSSProperties | undefined = {
        pointerEvents: 'auto',
        ...(style as CSSProperties)
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={mergedStyle}
            {...props}
        >
            {children}
        </motion.div>
    );
});

AnimatedWrapper.displayName = 'AnimatedWrapper';

export default AnimatedWrapper;