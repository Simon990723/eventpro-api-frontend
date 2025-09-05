import React from 'react';

const SimpleTestBackground: React.FC = () => {
  // Add keyframes to document head
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes testFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes testPulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
      }
      
      @keyframes testRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      }}
    >
      {/* Test floating blue circle */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '50px',
          height: '50px',
          backgroundColor: 'rgba(74, 144, 226, 0.5)',
          borderRadius: '50%',
          animation: 'testFloat 3s ease-in-out infinite',
        }}
      />
      
      {/* Test pulsing orange square */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '30%',
          width: '30px',
          height: '30px',
          backgroundColor: 'rgba(243, 156, 18, 0.6)',
          borderRadius: '4px',
          animation: 'testPulse 2s ease-in-out infinite',
        }}
      />
      
      {/* Test rotating triangle */}
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '70%',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '25px solid rgba(26, 54, 93, 0.4)',
          animation: 'testRotate 4s linear infinite',
        }}
      />
      
      {/* Static elements to test basic visibility */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(100, 116, 139, 0.3)',
          borderRadius: '8px',
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '60px',
          height: '20px',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default SimpleTestBackground;