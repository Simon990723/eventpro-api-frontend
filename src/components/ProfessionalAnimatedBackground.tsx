import React, { useEffect, useRef } from 'react';
import './ProfessionalAnimatedBackground.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'circle' | 'square' | 'triangle';
  rotation: number;
  rotationSpeed: number;
}

interface GeometricShape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: 'hexagon' | 'diamond' | 'pentagon';
  pulsePhase: number;
}

const ProfessionalAnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<GeometricShape[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Professional color palette inspired by corporate design
  const colors = [
    'rgba(26, 54, 93, 0.6)',    // Primary blue
    'rgba(74, 144, 226, 0.5)',  // Secondary blue
    'rgba(243, 156, 18, 0.4)',  // Accent orange
    'rgba(248, 250, 252, 0.7)', // Light gray
    'rgba(100, 116, 139, 0.5)', // Medium gray
  ];

  const initializeParticles = (canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    particlesRef.current = particles;
  };

  const initializeShapes = (canvas: HTMLCanvasElement) => {
    const shapes: GeometricShape[] = [];
    const shapeCount = Math.min(8, Math.floor((canvas.width * canvas.height) / 50000));

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.1 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ['hexagon', 'diamond', 'pentagon'][Math.floor(Math.random() * 3)] as 'hexagon' | 'diamond' | 'pentagon',
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    shapesRef.current = shapes;
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);

    switch (particle.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.lineTo(-particle.size * 0.866, particle.size / 2);
        ctx.lineTo(particle.size * 0.866, particle.size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  const drawGeometricShape = (ctx: CanvasRenderingContext2D, shape: GeometricShape) => {
    ctx.save();
    ctx.globalAlpha = shape.opacity * (0.8 + 0.2 * Math.sin(shape.pulsePhase));
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = 2;
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);

    const size = shape.size * (0.9 + 0.1 * Math.sin(shape.pulsePhase * 0.5));

    switch (shape.type) {
      case 'hexagon':
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * size / 2;
          const y = Math.sin(angle) * size / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, 0);
        ctx.lineTo(0, size / 2);
        ctx.lineTo(-size / 2, 0);
        ctx.closePath();
        ctx.stroke();
        break;
      case 'pentagon':
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * size / 2;
          const y = Math.sin(angle) * size / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        break;
    }

    ctx.restore();
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const maxDistance = 120;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.1;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = 'rgba(74, 144, 226, 0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  const updateParticles = (canvas: HTMLCanvasElement) => {
    particlesRef.current.forEach((particle) => {
      // Mouse interaction
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.speedX += (dx / distance) * force * 0.01;
        particle.speedY += (dy / distance) * force * 0.01;
      }

      // Apply movement
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;

      // Boundary collision with smooth bounce
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -0.8;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -0.8;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      // Friction
      particle.speedX *= 0.999;
      particle.speedY *= 0.999;

      // Subtle opacity pulsing
      particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity + (Math.random() - 0.5) * 0.01));
    });
  };

  const updateShapes = (canvas: HTMLCanvasElement) => {
    shapesRef.current.forEach((shape) => {
      shape.rotation += shape.rotationSpeed;
      shape.pulsePhase += 0.02;

      // Very slow drift
      shape.x += Math.sin(shape.pulsePhase * 0.1) * 0.1;
      shape.y += Math.cos(shape.pulsePhase * 0.1) * 0.1;

      // Keep shapes within bounds
      if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
      if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
      if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
      if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(248, 250, 252, 0.02)');
    gradient.addColorStop(0.5, 'rgba(241, 245, 249, 0.01)');
    gradient.addColorStop(1, 'rgba(248, 250, 252, 0.02)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw geometric shapes (background layer)
    updateShapes(canvas);
    shapesRef.current.forEach((shape) => drawGeometricShape(ctx, shape));

    // Update and draw particles
    updateParticles(canvas);
    
    // Draw connections between particles
    drawConnections(ctx, particlesRef.current);
    
    // Draw particles (foreground layer)
    particlesRef.current.forEach((particle) => drawParticle(ctx, particle));

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initializeParticles(canvas);
    initializeShapes(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles and shapes
    initializeParticles(canvas);
    initializeShapes(canvas);

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="professional-animated-background"
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
      {/* Additional CSS-only background layers */}
      <div className="background-layer-1" />
      <div className="background-layer-2" />
      <div className="background-layer-3" />
    </>
  );
};

export default ProfessionalAnimatedBackground;