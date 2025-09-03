import React, { useEffect, useRef, useState } from 'react';
import './ProfessionalAnimatedBackground.css';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'particle' | 'geometric' | 'line';
  rotation: number;
  rotationSpeed: number;
  pulsePhase: number;
}

const EnhancedAnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Professional corporate color palette
  const colors = [
    'rgba(26, 54, 93, 0.4)',    // Deep blue
    'rgba(74, 144, 226, 0.3)',  // Light blue
    'rgba(243, 156, 18, 0.2)',  // Orange accent
    'rgba(248, 250, 252, 0.5)', // Light gray
    'rgba(100, 116, 139, 0.3)', // Medium gray
    'rgba(59, 130, 246, 0.25)', // Primary blue
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      return mobile;
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const initializeElements = (canvas: HTMLCanvasElement) => {
    const elements: FloatingElement[] = [];
    const elementCount = isMobile ? 15 : 35;

    for (let i = 0; i < elementCount; i++) {
      const type = Math.random() < 0.6 ? 'particle' : Math.random() < 0.8 ? 'geometric' : 'line';
      
      elements.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'particle' ? Math.random() * 4 + 2 : Math.random() * 60 + 30,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.8),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.8),
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    elementsRef.current = elements;
  };

  const drawElement = (ctx: CanvasRenderingContext2D, element: FloatingElement) => {
    ctx.save();
    ctx.globalAlpha = element.opacity * (0.7 + 0.3 * Math.sin(element.pulsePhase));
    ctx.translate(element.x, element.y);
    ctx.rotate(element.rotation);

    switch (element.type) {
      case 'particle':
        // Draw glowing particle
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, element.size);
        gradient.addColorStop(0, element.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, element.size, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'geometric':
        // Draw geometric shapes
        ctx.strokeStyle = element.color;
        ctx.lineWidth = 2;
        const shapes = ['hexagon', 'square', 'triangle', 'diamond'];
        const shape = shapes[element.id % shapes.length];
        
        switch (shape) {
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = Math.cos(angle) * element.size / 2;
              const y = Math.sin(angle) * element.size / 2;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            break;

          case 'square':
            ctx.strokeRect(-element.size / 2, -element.size / 2, element.size, element.size);
            break;

          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -element.size / 2);
            ctx.lineTo(-element.size / 2, element.size / 2);
            ctx.lineTo(element.size / 2, element.size / 2);
            ctx.closePath();
            ctx.stroke();
            break;

          case 'diamond':
            ctx.beginPath();
            ctx.moveTo(0, -element.size / 2);
            ctx.lineTo(element.size / 2, 0);
            ctx.lineTo(0, element.size / 2);
            ctx.lineTo(-element.size / 2, 0);
            ctx.closePath();
            ctx.stroke();
            break;
        }
        break;

      case 'line':
        // Draw flowing lines
        ctx.strokeStyle = element.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-element.size, 0);
        ctx.quadraticCurveTo(0, -element.size / 4, element.size, 0);
        ctx.stroke();
        break;
    }

    ctx.restore();
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, elements: FloatingElement[]) => {
    const maxDistance = isMobile ? 80 : 120;
    const particles = elements.filter(e => e.type === 'particle');
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = 'rgba(74, 144, 226, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[j].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  const updateElements = (canvas: HTMLCanvasElement) => {
    elementsRef.current.forEach((element) => {
      // Mouse interaction
      const dx = mouseRef.current.x - element.x;
      const dy = mouseRef.current.y - element.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        element.speedX += (dx / distance) * force * 0.02;
        element.speedY += (dy / distance) * force * 0.02;
      }

      // Apply movement
      element.x += element.speedX;
      element.y += element.speedY;
      element.rotation += element.rotationSpeed;
      element.pulsePhase += 0.03;

      // Boundary wrapping
      if (element.x < -element.size) element.x = canvas.width + element.size;
      if (element.x > canvas.width + element.size) element.x = -element.size;
      if (element.y < -element.size) element.y = canvas.height + element.size;
      if (element.y > canvas.height + element.size) element.y = -element.size;

      // Friction
      element.speedX *= 0.998;
      element.speedY *= 0.998;

      // Opacity variation
      element.opacity = Math.max(0.05, Math.min(0.6, element.opacity + (Math.random() - 0.5) * 0.005));
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear with subtle gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(248, 250, 252, 0.03)');
    gradient.addColorStop(0.5, 'rgba(241, 245, 249, 0.02)');
    gradient.addColorStop(1, 'rgba(248, 250, 252, 0.03)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw elements
    updateElements(canvas);
    
    // Draw connections first (background layer)
    drawConnections(ctx, elementsRef.current);
    
    // Draw elements
    elementsRef.current.forEach((element) => drawElement(ctx, element));

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

    initializeElements(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initializeElements(canvas);
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

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
      
      {/* CSS-only background layers for additional depth */}
      <div className="background-layer-1" />
      <div className="background-layer-2" />
      <div className="geometric-pattern" />
      
      {/* Floating elements for extra visual interest */}
      <div className="floating-element" style={{ 
        top: '15%', 
        left: '10%', 
        animationDelay: '0s' 
      }} />
      <div className="floating-element" style={{ 
        top: '70%', 
        right: '15%', 
        animationDelay: '-8s' 
      }} />
      <div className="floating-element" style={{ 
        bottom: '20%', 
        left: '60%', 
        animationDelay: '-15s' 
      }} />
    </>
  );
};

export default EnhancedAnimatedBackground;