import React from 'react';

const CSSAnimatedBackground: React.FC = () => {
  return (
    <div className="css-animated-background">
      {/* Main background with gradient */}
      <div className="background-gradient" />
      
      {/* Floating particles */}
      <div className="floating-particles">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Geometric shapes */}
      <div className="geometric-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
      </div>

      <style jsx>{`
        .css-animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
        }

        .background-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(248, 250, 252, 0.8) 0%,
            rgba(241, 245, 249, 0.6) 25%,
            rgba(248, 250, 252, 0.7) 50%,
            rgba(241, 245, 249, 0.8) 75%,
            rgba(248, 250, 252, 0.9) 100%
          );
          animation: gradientShift 30s ease-in-out infinite;
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(74, 144, 226, 0.6) 0%, transparent 70%);
          border-radius: 50%;
          animation: floatParticle 20s linear infinite;
        }

        .particle:nth-child(2n) {
          background: radial-gradient(circle, rgba(26, 54, 93, 0.4) 0%, transparent 70%);
          width: 3px;
          height: 3px;
        }

        .particle:nth-child(3n) {
          background: radial-gradient(circle, rgba(243, 156, 18, 0.3) 0%, transparent 70%);
          width: 2px;
          height: 2px;
        }

        .geometric-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 8px;
          animation: floatShape 25s ease-in-out infinite;
        }

        .shape-1 {
          top: 15%;
          left: 10%;
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, rgba(74, 144, 226, 0.08), rgba(26, 54, 93, 0.04));
          animation-delay: 0s;
        }

        .shape-2 {
          top: 60%;
          right: 15%;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(243, 156, 18, 0.06), rgba(239, 68, 68, 0.04));
          border-radius: 50%;
          animation-delay: -8s;
        }

        .shape-3 {
          bottom: 20%;
          left: 60%;
          width: 50px;
          height: 50px;
          background: linear-gradient(90deg, rgba(100, 116, 139, 0.05), rgba(74, 144, 226, 0.03));
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          animation-delay: -15s;
        }

        .shape-4 {
          top: 40%;
          left: 80%;
          width: 35px;
          height: 35px;
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.06), rgba(100, 116, 139, 0.03));
          transform: rotate(45deg);
          animation-delay: -20s;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.8;
          }
          50% {
            background-position: 100% 50%;
            opacity: 0.6;
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatShape {
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

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .particle {
            width: 2px;
            height: 2px;
          }
          
          .shape-1 {
            width: 40px;
            height: 40px;
          }
          
          .shape-2 {
            width: 30px;
            height: 30px;
          }
          
          .shape-3 {
            width: 35px;
            height: 35px;
          }
          
          .shape-4 {
            width: 25px;
            height: 25px;
          }
        }

        /* Accessibility: Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .background-gradient,
          .particle,
          .shape {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CSSAnimatedBackground;