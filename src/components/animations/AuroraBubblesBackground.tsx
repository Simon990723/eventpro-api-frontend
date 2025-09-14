import React from 'react';

const AuroraBubblesBackground: React.FC = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-dynamic-bubbles', 'true');
    style.textContent = `
      /* Dynamic animated background with better readability */
      .dynamic-bg {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;

        /* Lighter gradient for better text readability */
        background:
          radial-gradient(circle at 20% 10%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 90%, rgba(167, 139, 250, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #ddd6fe 70%, #c7d2fe 100%);
      }

      /* Floating particle layer with smooth motion */
      .dynamic-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          radial-gradient(2px 2px at 20% 30%, rgba(139, 92, 246, 0.4), transparent 50%),
          radial-gradient(3px 3px at 40% 70%, rgba(167, 139, 250, 0.3), transparent 50%),
          radial-gradient(1px 1px at 90% 40%, rgba(196, 181, 253, 0.5), transparent 50%);
        background-size: 200px 200px, 300px 300px, 150px 150px;
        animation: particleFloat 20s linear infinite;
        opacity: 0.8;
      }

      /* Moving wave pattern overlay */
      .dynamic-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        background: 
          radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 100% 50%, rgba(167, 139, 250, 0.05) 0%, transparent 50%);
        animation: wavePattern 25s ease-in-out infinite;
        opacity: 0.7;
      }

      .floating-bubble {
        position: absolute;
        border-radius: 50%;
        filter: blur(1px);
        opacity: 0.6;
        mix-blend-mode: multiply;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-direction: alternate;
      }

      /* Smooth continuous animations */
      @keyframes float1 {
        0% { 
          transform: translate(0px, 0px) scale(1) rotate(0deg); 
          opacity: 0.6; 
        }
        25% { 
          transform: translate(30px, -20px) scale(1.1) rotate(90deg); 
          opacity: 0.8; 
        }
        50% { 
          transform: translate(60px, 10px) scale(0.9) rotate(180deg); 
          opacity: 0.4; 
        }
        75% { 
          transform: translate(20px, 40px) scale(1.05) rotate(270deg); 
          opacity: 0.7; 
        }
        100% { 
          transform: translate(-10px, -10px) scale(1) rotate(360deg); 
          opacity: 0.6; 
        }
      }

      @keyframes float2 {
        0% { 
          transform: translate(0px, 0px) scale(1) rotate(0deg); 
          opacity: 0.5; 
        }
        33% { 
          transform: translate(-25px, 30px) scale(1.15) rotate(120deg); 
          opacity: 0.8; 
        }
        66% { 
          transform: translate(35px, -25px) scale(0.85) rotate(240deg); 
          opacity: 0.3; 
        }
        100% { 
          transform: translate(10px, 15px) scale(1) rotate(360deg); 
          opacity: 0.5; 
        }
      }

      @keyframes float3 {
        0% { 
          transform: translate(0px, 0px) scale(1) rotate(0deg); 
          opacity: 0.7; 
        }
        20% { 
          transform: translate(40px, 20px) scale(1.2) rotate(72deg); 
          opacity: 0.9; 
        }
        40% { 
          transform: translate(-30px, 45px) scale(0.8) rotate(144deg); 
          opacity: 0.4; 
        }
        60% { 
          transform: translate(25px, -35px) scale(1.1) rotate(216deg); 
          opacity: 0.6; 
        }
        80% { 
          transform: translate(-15px, -20px) scale(0.95) rotate(288deg); 
          opacity: 0.8; 
        }
        100% { 
          transform: translate(5px, 10px) scale(1) rotate(360deg); 
          opacity: 0.7; 
        }
      }

      @keyframes particleFloat {
        0% { 
          transform: translate(0px, 0px) rotate(0deg); 
          opacity: 0.8; 
        }
        25% { 
          transform: translate(-10px, -15px) rotate(90deg); 
          opacity: 1; 
        }
        50% { 
          transform: translate(15px, 10px) rotate(180deg); 
          opacity: 0.6; 
        }
        75% { 
          transform: translate(-5px, 20px) rotate(270deg); 
          opacity: 0.9; 
        }
        100% { 
          transform: translate(0px, 0px) rotate(360deg); 
          opacity: 0.8; 
        }
      }

      @keyframes wavePattern {
        0% { 
          transform: translateY(0px) scale(1) rotate(0deg); 
          opacity: 0.7; 
        }
        50% { 
          transform: translateY(-30px) scale(1.05) rotate(180deg); 
          opacity: 0.9; 
        }
        100% { 
          transform: translateY(0px) scale(1) rotate(360deg); 
          opacity: 0.7; 
        }
      }

      /* Respect reduced motion preferences */
      @media (prefers-reduced-motion: reduce) {
        .dynamic-bg::before,
        .dynamic-bg::after,
        .floating-bubble {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Dynamic floating bubbles with different sizes, colors, and animations
  const bubbles = [
    {
      key: 'bubble1',
      style: {
        top: '10%',
        left: '15%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.4), rgba(167, 139, 250, 0.2) 70%, transparent 90%)',
        animation: 'float1 15s ease-in-out infinite',
      } as React.CSSProperties,
    },
    {
      key: 'bubble2',
      style: {
        top: '60%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.35), rgba(196, 181, 253, 0.18) 70%, transparent 90%)',
        animation: 'float2 18s ease-in-out infinite',
      } as React.CSSProperties,
    },
    {
      key: 'bubble3',
      style: {
        top: '30%',
        right: '25%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle at 30% 30%, rgba(196, 181, 253, 0.4), rgba(221, 214, 254, 0.2) 70%, transparent 90%)',
        animation: 'float3 12s ease-in-out infinite',
      } as React.CSSProperties,
    },
    {
      key: 'bubble4',
      style: {
        bottom: '20%',
        right: '15%',
        width: '90px',
        height: '90px',
        background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3), rgba(167, 139, 250, 0.15) 70%, transparent 90%)',
        animation: 'float1 20s ease-in-out infinite',
        animationDelay: '-5s',
      } as React.CSSProperties,
    },
    {
      key: 'bubble5',
      style: {
        top: '5%',
        right: '10%',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle at 30% 30%, rgba(221, 214, 254, 0.4), rgba(196, 181, 253, 0.2) 70%, transparent 90%)',
        animation: 'float2 16s ease-in-out infinite',
        animationDelay: '-8s',
      } as React.CSSProperties,
    },
    {
      key: 'bubble6',
      style: {
        bottom: '40%',
        left: '10%',
        width: '70px',
        height: '70px',
        background: 'radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.3), rgba(139, 92, 246, 0.15) 70%, transparent 90%)',
        animation: 'float3 14s ease-in-out infinite',
        animationDelay: '-3s',
      } as React.CSSProperties,
    },
    {
      key: 'bubble7',
      style: {
        top: '50%',
        right: '50%',
        width: '45px',
        height: '45px',
        background: 'radial-gradient(circle at 30% 30%, rgba(196, 181, 253, 0.35), rgba(221, 214, 254, 0.18) 70%, transparent 90%)',
        animation: 'float1 22s ease-in-out infinite',
        animationDelay: '-10s',
      } as React.CSSProperties,
    },
    {
      key: 'bubble8',
      style: {
        top: '80%',
        left: '60%',
        width: '55px',
        height: '55px',
        background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.25), rgba(167, 139, 250, 0.12) 70%, transparent 90%)',
        animation: 'float2 19s ease-in-out infinite',
        animationDelay: '-7s',
      } as React.CSSProperties,
    },
  ];

  return (
    <div className="dynamic-bg">
      {bubbles.map(bubble => (
        <div key={bubble.key} className="floating-bubble" style={bubble.style} />
      ))}
    </div>
  );
};

export default AuroraBubblesBackground;
