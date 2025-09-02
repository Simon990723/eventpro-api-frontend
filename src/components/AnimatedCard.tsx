import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    hoverScale?: number;
    tapScale?: number;
    gradient?: boolean;
    glow?: boolean;
}

const AnimatedCard = ({ 
    children, 
    className = '', 
    delay = 0,
    hoverScale = 1.03,
    tapScale = 0.98,
    gradient = false,
    glow = false
}: AnimatedCardProps) => {
    const cardVariants = {
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

    const hoverVariants = {
        scale: hoverScale,
        y: -8,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    };

    const tapVariants = {
        scale: tapScale,
        transition: {
            duration: 0.1,
            ease: "easeOut"
        }
    };

    const combinedClassName = `
        ${className} 
        ${gradient ? 'gradient-animated' : ''} 
        ${glow ? 'glow-effect' : ''}
    `.trim();

    return (
        <motion.div
            className={combinedClassName}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            style={{
                transformOrigin: 'center',
                pointerEvents: 'auto'
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard;