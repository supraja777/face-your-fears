import React from 'react';
import mot2 from '../assets/mot2.jpg'
import mot1 from '../assets/mot1.jfif'
import mot3 from '../assets/mot3.jpg'

const MotivationComponent = () => {
  // const pics = [
  //   "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
  //   "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
  //   "https://images.unsplash.com/photo-1533167649158-6d508895b680?w=400",
  //   "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400",
  //   "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
  //   "https://images.unsplash.com/photo-1518005020250-6e5949ad09e4?w=400", // Extra pics to ensure scroll
  //   "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400"
  // ];

  const pics = [
    mot2,
    mot1,
    mot3
  ]

  return (
    <aside style={{ 
      flex: '0 0 30%', 
      height: '100%',             
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#ffffff', 
      borderLeft: '1px solid #f1f5f9',
      overflow: 'hidden',          
      boxSizing: 'border-box'
    }}>
      {/* Header - Fixed at top */}
      <div style={{ padding: '32px 32px 20px 32px' }}>
        {/* <h3 style={{ 
          fontSize: '0.8rem', 
          fontWeight: '800', 
          color: '#94a3b8', 
          textTransform: 'uppercase',
          letterSpacing: '0.15em'
        }}>
          Motivation
        </h3> */}
      </div>

      {/* The Scrollable Box */}
      <div className="custom-scrollbar" style={{ 
        flex: 1, 
        overflowY: 'auto',        
        padding: '0 32px 32px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {pics.map((src, i) => (
          <div key={i} style={{ 
            borderRadius: '20px', 
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            flexShrink: 0 // Prevents images from squishing
          }}>
            <img 
              src={src} 
              style={{ 
                width: '100%', 
                display: 'block',
                transition: 'transform 0.3s ease'
              }} 
              alt="Inspiration"
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default MotivationComponent;