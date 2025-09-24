import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import React, { type ReactNode } from 'react';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ai';
    loading?: boolean;
    pulse?: boolean;
    bounce?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(({
                            children,
                            variant = 'primary',
                            loading = false,
                            pulse = false,
                            bounce = false,
                            className = '',
                            disabled,
                            ...props
                        }, ref) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'primary':
                return 'cta-button';
            case 'secondary':
                return 'button-secondary';
            case 'danger':
                return 'button-danger';
            case 'ai':
                return 'button-ai';
            default:
                return 'cta-button';
        }
    };

    const combinedVariants: Variants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.95,
            y: 0,
            transition: {
                duration: 0.1,
                ease: "easeOut"
            }
        },
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        bounce: {
            y: [0, -10, 0],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
            }
        },
        loading: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const combinedClassName = `${getVariantClass()} ${className}`.trim();

    return (
        <motion.button
            ref={ref}
            className={combinedClassName}
            variants={combinedVariants}
            initial="initial"
            whileHover={!disabled && !loading && !pulse && !bounce ? "hover" : undefined}
            whileTap={!disabled && !loading && !pulse && !bounce ? "tap" : undefined}
            animate={
                loading ? "loading" :
                    pulse ? "pulse" :
                        bounce ? "bounce" :
                            "initial"
            }
            aria-busy={loading || undefined}
            aria-disabled={disabled || loading || undefined}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <motion.div
                    // No need to pass variants here again, it inherits from the parent
                    animate="loading"
                    style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid transparent',
                        borderTop: '2px solid currentColor',
                        borderRadius: '50%',
                        display: 'inline-block'
                    }}
                />
            ) : (
                children
            )}
        </motion.button>
    );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;