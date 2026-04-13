import React from 'react';

interface PhotoObject {
  url: string;
  notes?: string;
}

interface ImageGalleryProps {
  photos?: (string | PhotoObject)[];
}

const ImageGallery = ({ photos = [] }: ImageGalleryProps) => {
  // Use a fallback to an empty array if photos is undefined/null
  const safePhotos = Array.isArray(photos) ? photos : [];

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
        {/* New Log Button */}
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
          cursor: 'pointer'
        }}>
          <span style={{ fontSize: '1.5rem' }}>+</span>
          New Log
        </div>

        {/* Render Photos */}
        {safePhotos.map((photo, index) => {
          let imageUrl = "";

          try {
            if (typeof photo === 'string') {
              // If the string is a JSON blob like '{"url": "..."}'
              if (photo.startsWith('{')) {
                const parsed = JSON.parse(photo);
                imageUrl = parsed.url;
              } else {
                // If it's a direct URL string
                imageUrl = photo;
              }
            } else if (photo && typeof photo === 'object') {
              // If it's a proper object
              imageUrl = (photo as PhotoObject).url;
            }
          } catch (e) {
            console.error("Error parsing photo data at index", index, e);
          }

          return (
            <div key={index} style={{
              aspectRatio: '1',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={imageUrl} 
                alt={`Log ${index + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = 'https://placehold.co/300x300?text=Error';
                }}
              />
              <div style={{
                position: 'absolute', bottom: '8px', left: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '2px 8px', borderRadius: '8px',
                fontSize: '0.65rem', fontWeight: '700', color: '#475569'
              }}>
                Log #{index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;