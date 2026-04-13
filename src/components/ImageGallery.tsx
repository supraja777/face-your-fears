import React, { useEffect } from 'react';

interface PhotoObject {
  url: string;
  notes?: string;
}

interface ImageGalleryProps {
  selectedChallengePhotos?: []
  photos?: (string | PhotoObject)[];
}

const ImageGallery = ({ photos = [] }: ImageGalleryProps) => {
  // Use a fallback to an empty array if photos is undefined/null
  console.log("Calling image gallery!")
  const safePhotos = Array.isArray(photos) ? photos : [];

  // Monitor prop changes and debug data format
  useEffect(() => {
    console.log("📸 ImageGallery: Received updated photos array", safePhotos);
  }, [photos]);

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
        <div 
          onClick={() => console.log("Open upload modal or trigger input")}
          style={{
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
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>+</span>
          New Log
        </div>

        {/* Render Photos */}
        {safePhotos.map((photo, index) => {
          let imageUrl = "";

          try {
            if (typeof photo === 'string') {
              // Handle JSON strings or direct URLs
              if (photo.startsWith('{')) {
                const parsed = JSON.parse(photo);
                imageUrl = parsed.url;
              } else {
                imageUrl = photo;
              }
            } else if (photo && typeof photo === 'object') {
              // Handle object types
              imageUrl = (photo as PhotoObject).url;
            }
          } catch (e) {
            console.error("Error parsing photo data at index", index, e);
            imageUrl = 'https://placehold.co/300x300?text=Invalid+Data';
          }

          return (
            <div 
              key={`${imageUrl}-${index}`} 
              style={{
                aspectRatio: '1',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}
            >
              <img 
                src={imageUrl} 
                alt={`Log ${index + 1}`} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block' 
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = 'https://placehold.co/300x300?text=Image+Error';
                }}
              />
              
              {/* Overlay Badge */}
              <div style={{
                position: 'absolute', 
                bottom: '8px', 
                left: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                padding: '4px 10px', 
                borderRadius: '10px',
                fontSize: '0.65rem', 
                fontWeight: '800', 
                color: '#1e293b',
                border: '1px solid rgba(226, 232, 240, 0.5)'
              }}>
                LOG #{index + 1}
              </div>
            </div>
          );
        })}
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