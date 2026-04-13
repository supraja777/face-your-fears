import React from 'react';

interface ImageGalleryProps {
  photos?: string[]; // Array of URLs from Supabase
}

const ImageGallery = ({ photos = [] }: ImageGalleryProps) => {
  console.log("Getting images ? ", photos)
  return (
    <div className="no-scrollbar" style={{
      backgroundColor: '#f8fafc',
      borderRadius: '28px',
      padding: '24px',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '16px',
        overflowY: 'auto',
      }}>
        {/* "Add Evidence" Slot - Always visible */}
        <div style={{
          aspectRatio: '1',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6366f1',
          fontSize: '0.85rem',
          fontWeight: '700',
          border: '2px dashed #6366f1',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#eef2ff';
          e.currentTarget.style.transform = 'scale(0.98)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        >
          <span style={{ fontSize: '1.5rem' }}>+</span>
          New Log
        </div>

        {/* Real Dynamic Content */}
        {photos.map((photoUrl, index) => (
          <div key={index} style={{
            aspectRatio: '1',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'zoom-in',
            overflow: 'hidden',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6366f1';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <img 
              src={photoUrl} 
              alt={`Log ${index + 1}`} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                // If URL is broken, show a placeholder icon
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image+Error';
              }}
            />
            {/* Overlay label */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '0.65rem',
              fontWeight: '700',
              color: '#475569'
            }}>
              Log #{index + 1}
            </div>
          </div>
        ))}

        {/* Empty State placeholders if there are no photos yet */}
        {photos.length === 0 && [1, 2].map((i) => (
          <div key={`empty-${i}`} style={{
            aspectRatio: '1',
            backgroundColor: '#f1f5f9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#cbd5e1',
            border: '1px solid #e2e8f0',
            opacity: 0.5
          }}>
            <div style={{ fontSize: '1.2rem' }}>🖼️</div>
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;