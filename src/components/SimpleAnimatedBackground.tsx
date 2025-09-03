import React, { useEffect, useRef } from 'react';

const SimpleAnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 20000));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: `rgba(${Math.floor(Math.random() * 100) + 50}, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 200}, 0.3)`,
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      // Clear canvas with subtle background
      ctx.fillStyle = 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.speedY *= -1;
        }

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections to nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = 'rgba(74, 144, 226, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      
      {/* CSS-only background layers */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          pointerEvents: 'none',
          background: `
            radial-gradient(circle at 20% 20%, rgba(74, 144, 226, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(243, 156, 18, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(26, 54, 93, 0.02) 0%, transparent 50%)
          `,
          animation: 'backgroundFloat 45s ease-in-out infinite',
        }}
      />
      
      {/* Floating geometric shapes */}
      <div
        style={{
          position: 'fixed',
          top: '15%',
          left: '10%',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, rgba(74, 144, 226, 0.1), rgba(26, 54, 93, 0.05))',
          borderRadius: '12px',
          zIndex: -1,
          pointerEvents: 'none',
          animation: 'floatShape1 20s ease-in-out infinite',
        }}
      />
      
      <div
        style={{
          position: 'fixed',
          top: '60%',
          right: '15%',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, rgba(243, 156, 18, 0.08), rgba(239, 68, 68, 0.05))',
          borderRadius: '50%',
          zIndex: -1,
          pointerEvents: 'none',
          animation: 'floatShape2 25s ease-in-out infinite',
        }}
      />
      
      <div
        style={{
          position: 'fixed',
          bottom: '20%',
          left: '60%',
          width: '50px',
          height: '50px',
          background: 'linear-gradient(90deg, rgba(100, 116, 139, 0.06), rgba(74, 144, 226, 0.04))',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          zIndex: -1,
          pointerEvents: 'none',
          animation: 'floatShape3 30s ease-in-out infinite',
        }}
      />

      <style jsx>{`
        @keyframes backgroundFloat {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          25% { 
            transform: translate(20px, -15px) scale(1.05);
            opacity: 0.8;
          }
          50% { 
            transform: translate(-10px, 10px) scale(0.95);
            opacity: 0.9;
          }
          75% { 
            transform: translate(15px, 20px) scale(1.02);
            opacity: 0.7;
          }
        }

        @keyframes floatShape1 {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-30px) rotate(270deg);
            opacity: 0.7;
          }
        }

        @keyframes floatShape2 {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes floatShape3 {
          0%, 100% { 
            transform: translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          33% { 
            transform: translateX(15px) rotate(120deg);
            opacity: 0.6;
          }
          66% { 
            transform: translateX(-15px) rotate(240deg);
            opacity: 0.3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] {
            animation: none !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="width: 60px"] {
            width: 40px !important;
            height: 40px !important;
          }
          div[style*="width: 50px"] {
            width: 35px !important;
            height: 35px !important;
          }
        }
      `}</style>
    </>
  );
};

export default SimpleAnimatedBackground;