import React from 'react';

const ImageGallery = () => {
  // Mock data for gallery items
  const galleryItems = [1, 2, 3, 4, 5, 6];

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
        {/* Special "Add Evidence" Slot */}
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

        {galleryItems.map((item) => (
          <div key={item} style={{
            aspectRatio: '1',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '0.8rem',
            fontWeight: '600',
            border: '1px solid #e2e8f0',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'default',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6366f1';
            e.currentTarget.style.color = '#6366f1';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
          }}
        >
          <div style={{ fontSize: '1.2rem', marginBottom: '4px', opacity: 0.6 }}>🖼️</div>
          Log #{item}
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