import React from 'react';
import featuresImg from '../assets/image.png';

interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeaturesModal = ({ isOpen, onClose }: FeaturesModalProps) => {
  if (!isOpen) return null;

  const features = [
    { icon: '🧠', title: 'AI Verification', desc: 'Neural networks audit proof of work for absolute integrity.' },
    { icon: '🔥', title: 'Streak Engine', desc: 'Consistency tracking with momentum-safe protection.' },
    { icon: '📸', title: 'Evidence Gallery', desc: 'A rich visual history of your growth, stored securely.' },
    { icon: '⚡', title: 'Vite Optimized', desc: 'Blazing fast, instantaneous application experience.' },
  ];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10005,
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div style={{
        backgroundColor: 'white', 
        width: '1050px', 
        height: '500px', // Reduced height for a sleeker profile
        borderRadius: '40px',
        boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        overflow: 'hidden',
        animation: 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}>
        
        {/* --- LEFT SIDE: CONTENT --- */}
        <div style={{ 
          width: '62%', 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '40px 48px',
          position: 'relative',
          backgroundColor: '#ffffff'
        }}>
          <header style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.03em' }}>
              Project Features
            </h2>
            <p style={{ color: '#6366f1', fontWeight: '700', fontSize: '0.85rem', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Advanced Neural Tracking v2.0
            </p>
          </header>

          {/* FEATURES GRID */}
          <div className="no-scrollbar" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '12px', 
            flex: 1, 
            overflowY: 'auto'
          }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{
                padding: '20px', 
                borderRadius: '20px', 
                backgroundColor: '#f8fafc',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default'
              }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{f.icon}</div>
                <h4 style={{ margin: '0 0 4px 0', color: '#1e293b', fontWeight: '800', fontSize: '0.9rem' }}>{f.title}</h4>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', lineHeight: '1.5', fontWeight: '500' }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={onClose} style={{
            marginTop: '24px', padding: '18px', borderRadius: '18px', border: 'none',
            background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', 
            color: 'white', fontWeight: '800', fontSize: '1rem',
            cursor: 'pointer', transition: 'transform 0.2s ease',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Explore Project
          </button>
        </div>

        {/* --- RIGHT SIDE: IMAGE HERO (Decreased Height Look) --- */}
        <div style={{ 
          position: 'relative', 
          width: '38%', 
          height: '100%', 
          backgroundColor: '#f1f5f9', // Background color for the image container
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={featuresImg} 
            alt="Features Display" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' // Image still fills the 500px height container
            }} 
          />
          
          <button onClick={onClose} style={{
            position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(12px)', width: '36px', height: '36px', borderRadius: '50%', 
            cursor: 'pointer', color: 'white', fontWeight: 'bold', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>×</button>
        </div>

      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .feature-card:hover {
          background-color: #ffffff !important;
          border-color: rgba(99, 102, 241, 0.3) !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.06);
        }
        @keyframes popIn { 
          from { opacity: 0; transform: scale(0.96) translateY(10px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
      `}</style>
    </div>
  );
};

export default FeaturesModal;