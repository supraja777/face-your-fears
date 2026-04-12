import React, { useState } from 'react';

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<{ name: string; date: string } | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // 1. Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // 2. Extract Date Metadata
      // .lastModified returns a timestamp, we convert it to a readable string
      const dateTaken = new Date(file.lastModified).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      setMetadata({
        name: file.name,
        date: dateTaken
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#0f172a', marginBottom: '8px', fontWeight: '800' }}>Capture Evidence</h2>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Upload a screenshot to verify your mission.</p>

        {/* Custom Upload Button */}
        <label style={{
          display: 'inline-block',
          padding: '16px 32px',
          backgroundColor: '#6366f1',
          color: 'white',
          borderRadius: '16px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          marginBottom: '32px'
        }}>
          Choose File
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
          />
        </label>

        {/* Display Area */}
        {selectedImage && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              marginBottom: '20px'
            }}>
              <img 
                src={selectedImage} 
                alt="Evidence" 
                style={{ width: '100%', display: 'block' }} 
              />
            </div>

            {metadata && (
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid #bbf7d0',
                textAlign: 'left'
              }}>
                <p style={{ margin: '0 0 4px 0', color: '#166534', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>
                  Verification Metadata
                </p>
                <p style={{ margin: 0, color: '#15803d', fontSize: '0.9rem', fontWeight: '600' }}>
                  📅 Captured: {metadata.date}
                </p>
                <p style={{ margin: '4px 0 0 0', color: '#15803d', fontSize: '0.8rem', opacity: 0.8 }}>
                  📄 {metadata.name}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;