import React from 'react';

const AuroraBubblesBackground: React.FC = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-aurora-bubbles', 'true');
    style.textContent = `
      /* Self-contained background styles (no global collisions) */
      .aurora-bg {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;

        /* Rich violet-indigo base field with a subtle top glow */
        background:
          radial-gradient(60vmin 60vmin at 50% -10%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 35%, transparent 70%),
          linear-gradient(0deg, #3d2bd0 0%, #5a3ff2 60%);
      }

      /* Gentle dotted parallax layer */
      .aurora-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          radial-gradient(2px 2px at 25% 25%, rgba(255,255,255,0.16), transparent 45%),
          radial-gradient(1.5px 1.5px at 75% 70%, rgba(255,255,255,0.10), transparent 45%),
          radial-gradient(1px 1px at 60% 40%, rgba(255,255,255,0.08), transparent 50%);
        background-size: 140px 140px, 180px 180px, 220px 220px;
        animation: auroraParallax 60s linear infinite;
        mix-blend-mode: soft-light;
      }

      .aurora-orb {
        position: absolute;
        top: -22vmin;
        left: 50%;
        width: 84vmin;
        height: 84vmin;
        transform: translateX(-50%);
        border-radius: 50%;
        background: radial-gradient(circle at 50% 50%,
          rgba(255,255,255,0.14) 0%,
          rgba(133, 114, 255, 0.10) 35%,
          rgba(91, 63, 245, 0.06) 60%,
          rgba(0,0,0,0) 75%);
        filter: blur(6px);
        opacity: 0.65;
        animation: orbPulse 18s ease-in-out infinite;
      }

      .aurora-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(8px);
        opacity: 0.75;
        mix-blend-mode: screen;
        transform-origin: 50% 50%;
        will-change: transform;
      }

      /* Keyframes for subtle drift and parallax */
      @keyframes driftA {
        0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        50% { transform: translate(22px, -18px) scale(1.05) rotate(10deg); }
      }
      @keyframes driftB {
        0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        50% { transform: translate(-18px, 20px) scale(1.04) rotate(-8deg); }
      }
      @keyframes driftC {
        0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
        50% { transform: translate(16px, 14px) scale(1.06) rotate(6deg); }
      }
      @keyframes orbPulse {
        0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.65; }
        50% { transform: translateX(-50%) scale(1.03); opacity: 0.8; }
      }
      @keyframes auroraParallax {
        0% { transform: translateY(0px) translateX(0px); opacity: 0.45; }
        50% { transform: translateY(-18px) translateX(10px); opacity: 0.65; }
        100% { transform: translateY(0px) translateX(0px); opacity: 0.45; }
      }

      /* Respect user motion preferences */
      @media (prefers-reduced-motion: reduce) {
        .aurora-bg::after,
        .aurora-orb,
        .aurora-blob {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Config for floating blobs (sizes/positions/colors/durations)
  const blobs = [
    {
      key: 'b1',
      style: {
        top: '18%',
        left: '12%',
        width: '42vmin',
        height: '42vmin',
        background: 'radial-gradient(circle at 30% 30%, rgba(130,105,255,0.75), rgba(90,63,242,0.28) 60%, transparent 70%)',
        animation: 'driftA 48s ease-in-out infinite',
      } as React.CSSProperties,
    },
    {
      key: 'b2',
      style: {
        top: '56%',
        left: '22%',
        width: '28vmin',
        height: '28vmin',
        background: 'radial-gradient(circle at 30% 30%, rgba(91,63,245,0.75), rgba(67,46,218,0.28) 60%, transparent 70%)',
        animation: 'driftB 62s ease-in-out infinite',
      } as React.CSSProperties,
    },
    {
      key: 'b3',
      style: {
        top: '42%',
        right: '18%',
        width: '46vmin',
        height: '46vmin',
        background: 'radial-gradient(circle at 30% 30%, rgba(173,140,255,0.7), rgba(116,86,255,0.26) 60%, transparent 72%)',
        animation: 'driftC 54s ease-in-out infinite',
      } as React.CSSProperties,
    },
    {
      key: 'b4',
      style: {
        bottom: '12%',
        right: '8%',
        width: '26vmin',
        height: '26vmin',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.24), rgba(160,140,255,0.18) 55%, transparent 70%)',
        animation: 'driftA 70s ease-in-out infinite',
      } as React.CSSProperties,
    },
    {
      key: 'b5',
      style: {
        top: '8%',
        right: '32%',
        width: '22vmin',
        height: '22vmin',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(150,130,255,0.15) 55%, transparent 70%)',
        animation: 'driftB 58s ease-in-out infinite',
      } as React.CSSProperties,
    },
  ];

  return (
    <div className="aurora-bg">
      <div className="aurora-orb" />
      {blobs.map(b => (
        <span key={b.key} className="aurora-blob" style={b.style} />
      ))}
    </div>
  );
};

export default AuroraBubblesBackground;
