import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ai';
    loading?: boolean;
    pulse?: boolean;
    bounce?: boolean;
}

const AnimatedButton = ({ 
    children, 
    variant = 'primary',
    loading = false,
    pulse = false,
    bounce = false,
    className = '',
    disabled,
    ...props 
}: AnimatedButtonProps) => {
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

    const buttonVariants = {
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
        }
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const bounceVariants = {
        bounce: {
            y: [0, -10, 0],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeOut"
            }
        }
    };

    const loadingVariants = {
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
            className={combinedClassName}
            variants={buttonVariants}
            initial="initial"
            whileHover={!disabled && !loading ? "hover" : undefined}
            whileTap={!disabled && !loading ? "tap" : undefined}
            animate={
                loading ? "loading" : 
                pulse ? "pulse" : 
                bounce ? "bounce" : 
                "initial"
            }
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <motion.div
                    variants={loadingVariants}
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
};

export default AnimatedButton;