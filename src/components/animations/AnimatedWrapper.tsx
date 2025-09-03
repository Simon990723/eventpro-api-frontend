import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedWrapperProps {
    children: ReactNode;
    animation?: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'bounceIn' | 'staggerChildren';
    delay?: number;
    duration?: number;
    className?: string;
    staggerDelay?: number;
}

const animations = {
    fadeIn: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    },
    slideInLeft: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    },
    slideInRight: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 }
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
    },
    bounceIn: {
        initial: { opacity: 0, scale: 0.3 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        exit: { opacity: 0, scale: 0.3 }
    },
    staggerChildren: {
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        },
        exit: {}
    }
};

const AnimatedWrapper = ({ 
    children, 
    animation = 'fadeIn', 
    delay = 0, 
    duration = 0.6,
    className = '',
    staggerDelay = 0.1
}: AnimatedWrapperProps) => {
    const selectedAnimation = animations[animation];
    
    const transition = animation === 'staggerChildren' 
        ? { staggerChildren: staggerDelay }
        : { duration, delay, ease: "easeOut" };

    return (
        <motion.div
            className={className}
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            exit={selectedAnimation.exit}
            transition={transition}
            style={{ pointerEvents: 'auto' }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedWrapper;