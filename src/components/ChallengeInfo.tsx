import React from 'react';

interface ChallengeInfoProps {
  onBack: () => void;
}

const ChallengeInfo = ({ onBack }: ChallengeInfoProps) => {
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
      {/* Back Button */}
      <button 
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          color: '#475569',
          fontWeight: '700',
          cursor: 'pointer',
          padding: '10px 20px',
          borderRadius: '14px',
          fontSize: '0.9rem',
          width: 'fit-content',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          marginBottom: '24px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-4px)';
          e.currentTarget.style.backgroundColor = '#6366f1';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.borderColor = '#6366f1';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.color = '#475569';
          e.currentTarget.style.borderColor = '#e2e8f0';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>←</span> 
        Back to Workspace

      </button>

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

export default ChallengeInfo;