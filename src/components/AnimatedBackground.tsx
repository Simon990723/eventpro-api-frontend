import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
}

const AnimatedBackground = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Enhanced mobile detection
        const checkMobile = () => {
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                                 window.innerWidth <= 768 ||
                                 ('ontouchstart' in window) ||
                                 (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
            setIsMobile(isMobileDevice);
            return isMobileDevice;
        };

        const isMobileDevice = checkMobile();

        const colors = [
            'rgba(107, 114, 128, 0.05)', // calendar-grey - very subtle for mobile
            'rgba(59, 130, 246, 0.05)',  // calendar-blue
            'rgba(251, 191, 36, 0.03)',  // calendar-yellow
            'rgba(239, 68, 68, 0.05)',   // calendar-red
            'rgba(156, 163, 175, 0.03)', // calendar-grey-light
        ];

        const generateParticles = () => {
            const newParticles: Particle[] = [];
            // Minimal particles on mobile for performance
            const particleCount = isMobileDevice ? 4 : 12;
            
            for (let i = 0; i < particleCount; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: isMobileDevice ? Math.random() * 1 + 0.5 : Math.random() * 2 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    duration: isMobileDevice ? Math.random() * 60 + 50 : Math.random() * 40 + 30,
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
        
        const handleResize = () => {
            checkMobile();
            generateParticles();
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Simplified animations for mobile
    const floatingVariants = {
        animate: {
            y: isMobile ? [0, -15, 0] : [0, -30, 0],
            x: isMobile ? [0, 8, -8, 0] : [0, 15, -15, 0],
            rotate: isMobile ? [0, 90, 180] : [0, 180, 360],
            transition: {
                duration: isMobile ? 30 : 20,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const pulseVariants = {
        animate: {
            scale: isMobile ? [1, 1.1, 1] : [1, 1.2, 1],
            opacity: isMobile ? [0.2, 0.4, 0.2] : [0.3, 0.6, 0.3],
            transition: {
                duration: isMobile ? 6 : 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Don't render complex animations on mobile
    if (isMobile) {
        return (
            <div className="animated-background">
                {/* Only essential particles for mobile */}
                {particles.slice(0, 3).map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="floating-particle"
                        initial={{
                            x: particle.x,
                            y: particle.y,
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            scale: 1,
                            opacity: 0.3,
                            y: [particle.y, particle.y - 30, particle.y],
                            x: [particle.x, particle.x + 20, particle.x - 20, particle.x],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 10
                        }}
                        style={{
                            position: 'fixed',
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                            borderRadius: '50%',
                            pointerEvents: 'none',
                            zIndex: -1,
                            willChange: 'transform',
                        }}
                    />
                ))}

                {/* Simplified geometric shapes for mobile */}
                <motion.div
                    className="geometric-shape shape-mobile-1"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 90, 180],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'fixed',
                        top: '20%',
                        left: '10%',
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(45deg, rgba(107, 114, 128, 0.05), rgba(59, 130, 246, 0.05))',
                        borderRadius: '15px',
                        pointerEvents: 'none',
                        zIndex: -1,
                        willChange: 'transform',
                    }}
                />

                <motion.div
                    className="geometric-shape shape-mobile-2"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5
                    }}
                    style={{
                        position: 'fixed',
                        bottom: '25%',
                        right: '15%',
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(239, 68, 68, 0.05))',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: -1,
                        willChange: 'transform',
                    }}
                />

                {/* Single subtle calendar icon for mobile */}
                <motion.div
                    className="floating-calendar mobile-calendar"
                    animate={{ 
                        opacity: [0, 0.1, 0.1, 0],
                        scale: [0.8, 0.9, 0.8],
                        rotate: [0, 45, 90]
                    }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '1rem',
                        pointerEvents: 'none',
                        zIndex: -1,
                        filter: 'blur(2px)',
                        willChange: 'transform',
                    }}
                >
                    📅
                </motion.div>
            </div>
        );
    }

    // Full desktop version
    return (
        <div className="animated-background">
            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="floating-particle"
                    initial={{
                        x: particle.x,
                        y: particle.y,
                        scale: 0,
                        opacity: 0
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        y: [particle.y, particle.y - 100, particle.y],
                        x: [particle.x, particle.x + 50, particle.x - 50, particle.x],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5
                    }}
                    style={{
                        position: 'fixed',
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: -1,
                        willChange: 'transform',
                    }}
                />
            ))}

            {/* Geometric Shapes with Calendar Theme */}
            <motion.div
                className="geometric-shape shape-1"
                variants={floatingVariants}
                animate="animate"
                style={{
                    position: 'fixed',
                    top: '10%',
                    left: '10%',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(45deg, rgba(107, 114, 128, 0.08), rgba(59, 130, 246, 0.08))',
                    borderRadius: '20px',
                    pointerEvents: 'none',
                    zIndex: -1,
                    willChange: 'transform',
                }}
            />

            <motion.div
                className="geometric-shape shape-2"
                variants={pulseVariants}
                animate="animate"
                style={{
                    position: 'fixed',
                    top: '20%',
                    right: '15%',
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(239, 68, 68, 0.08))',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: -1,
                    willChange: 'transform',
                }}
            />

            <motion.div
                className="geometric-shape shape-3"
                variants={floatingVariants}
                animate="animate"
                style={{
                    position: 'fixed',
                    bottom: '15%',
                    left: '20%',
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.08), rgba(96, 165, 250, 0.08))',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    pointerEvents: 'none',
                    zIndex: -1,
                    willChange: 'transform',
                }}
            />

            {/* Calendar Elements - Desktop Only */}
            <motion.div
                className="floating-calendar calendar-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.15, 0.15, 0],
                    scale: [0, 0.8, 0.8, 0],
                    rotate: [0, 180],
                    x: [0, 50, -25, 0],
                    y: [0, -40, 20, 0]
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'fixed',
                    top: '15%',
                    left: '5%',
                    fontSize: '1.2rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(1px)',
                    willChange: 'transform',
                }}
            >
                📅
            </motion.div>

            <motion.div
                className="floating-calendar calendar-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.12, 0.12, 0],
                    scale: [0, 0.9, 0.9, 0],
                    rotate: [0, -90],
                    x: [0, -60, 40, 0],
                    y: [0, 30, -20, 0]
                }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 10
                }}
                style={{
                    position: 'fixed',
                    top: '60%',
                    right: '8%',
                    fontSize: '1.1rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(1px)',
                    willChange: 'transform',
                }}
            >
                🗓️
            </motion.div>

            {/* Simplified SVG lines for better performance */}
            <motion.svg
                className="animated-lines"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: -1,
                    opacity: 0.3,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 3 }}
            >
                <motion.path
                    d="M0,100 Q150,50 300,100 T600,100"
                    stroke="rgba(59, 130, 246, 0.06)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.svg>
        </div>
    );
};

export default AnimatedBackground;