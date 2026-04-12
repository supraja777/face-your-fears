import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CongratulationsModal = ({ isOpen, onClose }: CongratulationsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // 1. Dynamically Load Tenor Script for the GIF
      const script = document.createElement('script');
      script.src = "https://tenor.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      // 2. Continuous Confetti Burst
      const end = Date.now() + 3 * 1000;
      const colors = ['#6366f1', '#10b981', '#fbbf24'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '420px',
        padding: '40px',
        borderRadius: '40px',
        textAlign: 'center',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}>
        
        {/* TENOR GIF EMBED AREA */}
        <div style={{ 
          marginBottom: '20px', 
          borderRadius: '24px', 
          overflow: 'hidden',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc'
        }}>
          <div 
            className="tenor-gif-embed" 
            data-postid="24853638" 
            data-share-method="host" 
            data-aspect-ratio="1" 
            data-width="100%"
          >
            <a href="https://tenor.com/view/zift-gif-24853638">Zift Sticker</a>
          </div>
        </div>

        <h2 style={{ 
          fontSize: '2.2rem', 
          fontWeight: '900', 
          color: '#0f172a', 
          margin: '0 0 12px 0',
          letterSpacing: '-0.03em'
        }}>
          Conqueror!
        </h2>

        <p style={{ 
          fontSize: '1.1rem', 
          color: '#64748b', 
          lineHeight: '1.6',
          margin: '0 0 32px 0'
        }}>
          "Very few conquer their fears... <br/> 
          <span style={{ color: '#6366f1', fontWeight: '800' }}>Congratulations</span> on taking another step."
        </p>

        <button 
          onClick={onClose}
          style={{
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontSize: '1.1rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Keep Growing
        </button>

        <style>{`
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.6); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CongratulationsModal;