import React from 'react';

const ImageGallery = () => {
  // Mock data for gallery items
  const galleryItems = [1, 2, 3, 4, 5, 6];

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      borderRadius: '24px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '800', fontSize: '1.1rem' }}>
        Evidence Gallery
      </h4>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        overflowY: 'auto',
        paddingRight: '4px'
      }}>
        {galleryItems.map((item) => (
          <div key={item} style={{
            aspectRatio: '1',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '0.8rem',
            border: '2px dashed #cbd5e1',
            transition: 'all 0.2s ease'
          }}>
            Image {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;