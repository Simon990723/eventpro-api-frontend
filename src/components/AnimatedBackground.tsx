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

    useEffect(() => {
        const colors = [
            'rgba(102, 126, 234, 0.1)',
            'rgba(118, 75, 162, 0.1)',
            'rgba(240, 147, 251, 0.1)',
            'rgba(245, 87, 108, 0.1)',
            'rgba(79, 172, 254, 0.1)',
        ];

        const generateParticles = () => {
            const newParticles: Particle[] = [];
            for (let i = 0; i < 50; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 4 + 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    duration: Math.random() * 20 + 10,
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
        window.addEventListener('resize', generateParticles);
        return () => window.removeEventListener('resize', generateParticles);
    }, []);

    const floatingVariants = {
        animate: {
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 360],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

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
                    }}
                />
            ))}

            {/* Geometric Shapes */}
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
                    background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    borderRadius: '20px',
                    pointerEvents: 'none',
                    zIndex: -1,
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
                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: -1,
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
                    background: 'linear-gradient(90deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            />

            <motion.div
                className="geometric-shape shape-4"
                variants={pulseVariants}
                animate="animate"
                style={{
                    position: 'fixed',
                    bottom: '25%',
                    right: '10%',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(225deg, rgba(102, 126, 234, 0.08), rgba(240, 147, 251, 0.08))',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            />

            {/* Animated Lines */}
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
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <motion.path
                    d="M0,100 Q150,50 300,100 T600,100"
                    stroke="rgba(102, 126, 234, 0.1)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.path
                    d="M100,200 Q250,150 400,200 T700,200"
                    stroke="rgba(240, 147, 251, 0.1)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </motion.svg>
        </div>
    );
};

export default AnimatedBackground;