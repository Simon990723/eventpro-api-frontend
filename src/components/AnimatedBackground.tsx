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
            'rgba(107, 114, 128, 0.1)', // calendar-grey
            'rgba(59, 130, 246, 0.1)',  // calendar-blue
            'rgba(251, 191, 36, 0.1)',  // calendar-yellow
            'rgba(239, 68, 68, 0.1)',   // calendar-red
            'rgba(156, 163, 175, 0.1)', // calendar-grey-light
        ];

        const generateParticles = () => {
            const newParticles: Particle[] = [];
            for (let i = 0; i < 25; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 3 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    duration: Math.random() * 30 + 20,
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
                    background: 'linear-gradient(45deg, rgba(107, 114, 128, 0.1), rgba(59, 130, 246, 0.1))',
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
                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(239, 68, 68, 0.1))',
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
                    background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(96, 165, 250, 0.1))',
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
                    background: 'linear-gradient(225deg, rgba(107, 114, 128, 0.08), rgba(251, 191, 36, 0.08))',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            />

            {/* Calendar Elements - Subtle and Comfortable */}
            <motion.div
                className="floating-calendar calendar-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.2, 0.2, 0],
                    scale: [0, 0.8, 0.8, 0],
                    rotate: [0, 180],
                    x: [0, 50, -25, 0],
                    y: [0, -40, 20, 0]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'fixed',
                    top: '15%',
                    left: '5%',
                    fontSize: '1.5rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(1px)',
                }}
            >
                📅
            </motion.div>

            <motion.div
                className="floating-calendar calendar-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.4, 0.4, 0],
                    scale: [0, 1.2, 1.2, 0],
                    rotate: [0, -180],
                    x: [0, -120, 80, 0],
                    y: [0, 60, -40, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                style={{
                    position: 'fixed',
                    top: '60%',
                    right: '8%',
                    fontSize: '1.8rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(0.5px)',
                }}
            >
                🗓️
            </motion.div>

            <motion.div
                className="floating-calendar calendar-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.5, 0.5, 0],
                    scale: [0, 0.8, 0.8, 0],
                    rotate: [0, 270],
                    x: [0, 60, -30, 0],
                    y: [0, -100, 50, 0]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 10
                }}
                style={{
                    position: 'fixed',
                    bottom: '20%',
                    left: '15%',
                    fontSize: '1.5rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(0.5px)',
                }}
            >
                📆
            </motion.div>

            <motion.div
                className="floating-calendar calendar-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.3, 0.3, 0],
                    scale: [0, 1.5, 1.5, 0],
                    rotate: [0, 180],
                    x: [0, -80, 40, 0],
                    y: [0, 70, -35, 0]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 15
                }}
                style={{
                    position: 'fixed',
                    top: '40%',
                    right: '20%',
                    fontSize: '2.2rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(0.5px)',
                }}
            >
                🗓️
            </motion.div>

            {/* Event-related Icons */}
            <motion.div
                className="floating-icon event-icon-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.4, 0.4, 0],
                    scale: [0, 1, 1, 0],
                    rotate: [0, 360],
                    x: [0, 90, -45, 0],
                    y: [0, -60, 30, 0]
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                style={{
                    position: 'fixed',
                    top: '25%',
                    left: '80%',
                    fontSize: '1.8rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(0.5px)',
                }}
            >
                🎉
            </motion.div>

            <motion.div
                className="floating-icon event-icon-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.5, 0.5, 0],
                    scale: [0, 1.3, 1.3, 0],
                    rotate: [0, -270],
                    x: [0, -70, 35, 0],
                    y: [0, 80, -40, 0]
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 8
                }}
                style={{
                    position: 'fixed',
                    bottom: '30%',
                    right: '5%',
                    fontSize: '1.6rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(0.5px)',
                }}
            >
                🎪
            </motion.div>

            <motion.div
                className="floating-icon event-icon-3"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 0.6, 0.6, 0],
                    scale: [0, 0.9, 0.9, 0],
                    rotate: [0, 180],
                    x: [0, 50, -25, 0],
                    y: [0, -90, 45, 0]
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 12
                }}
                style={{
                    position: 'fixed',
                    top: '70%',
                    left: '25%',
                    fontSize: '1.4rem',
                    pointerEvents: 'none',
                    zIndex: -1,
                    filter: 'blur(0.5px)',
                }}
            >
                🎭
            </motion.div>

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
                
                {/* Calendar Grid Lines */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 3, delay: 1 }}
                >
                    {/* Vertical lines */}
                    <motion.line
                        x1="20%" y1="0%" x2="20%" y2="100%"
                        stroke="rgba(102, 126, 234, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.line
                        x1="40%" y1="0%" x2="40%" y2="100%"
                        stroke="rgba(240, 147, 251, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="3,7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
                    />
                    <motion.line
                        x1="60%" y1="0%" x2="60%" y2="100%"
                        stroke="rgba(79, 172, 254, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="4,6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 4 }}
                    />
                    <motion.line
                        x1="80%" y1="0%" x2="80%" y2="100%"
                        stroke="rgba(245, 87, 108, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="6,4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    
                    {/* Horizontal lines */}
                    <motion.line
                        x1="0%" y1="25%" x2="100%" y2="25%"
                        stroke="rgba(102, 126, 234, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="8,2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 3 }}
                    />
                    <motion.line
                        x1="0%" y1="50%" x2="100%" y2="50%"
                        stroke="rgba(240, 147, 251, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 5 }}
                    />
                    <motion.line
                        x1="0%" y1="75%" x2="100%" y2="75%"
                        stroke="rgba(79, 172, 254, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="7,3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1.5 }}
                    />
                </motion.g>
            </motion.svg>
        </div>
    );
};

export default AnimatedBackground;