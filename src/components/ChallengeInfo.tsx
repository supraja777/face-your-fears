import React from 'react';
import ImageGallery from './ImageGallery';

interface Challenge {
  name: string;
  streak: number;
  description?: string; // Added description to the interface
  difficulty?: string;
}

interface ChallengeInfoProps {
  challenge: Challenge;
  onBack: () => void;
}

const ChallengeInfo = ({ challenge, onBack }: ChallengeInfoProps) => {
  const galleryItems = [1, 2, 3, 4, 5];

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '32px',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
      animation: 'slideIn 0.4s ease-out',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      
      {/* 1. Back Button */}
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
          transition: 'all 0.3s ease',
          marginBottom: '24px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#6366f1';
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.borderColor = '#6366f1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.color = '#475569';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      >
        ← Back to Workspace
      </button>

      {/* 2. Header & Description Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              {challenge.name}
            </h3>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <span style={{ backgroundColor: '#eef2ff', color: '#6366f1', padding: '6px 12px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700' }}>
                🔥 {challenge.streak} DAY STREAK
              </span>
              {challenge.difficulty && (
                <span style={{ backgroundColor: '#f8fafc', color: '#64748b', padding: '6px 12px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700', border: '1px solid #e2e8f0' }}>
                  LEVEL: {challenge.difficulty}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mission Objective (The Description) */}
        <div style={{ 
          marginTop: '24px', 
          padding: '20px', 
          backgroundColor: '#f8fafc', 
          borderRadius: '20px', 
          border: '1px solid #f1f5f9' 
        }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Mission Objective
          </h5>
          <p style={{ margin: 0, color: '#334155', fontSize: '1rem', lineHeight: '1.6', fontWeight: '500' }}>
            {challenge.description || "No objective defined for this mission yet. Keep pushing your boundaries!"}
          </p>
        </div>
      </div>

      {/* 3. Evidence Gallery */}
      <ImageGallery/>
      {/* <h4 style={{ margin: '0 0 16px 0', color: '#0f172a', fontWeight: '800', fontSize: '1.1rem' }}>
        Evidence Gallery
      </h4>
      
      <div className="custom-scrollbar" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '16px',
        overflowY: 'auto',
        paddingRight: '8px'
      }}>
        {galleryItems.map((item) => (
          <div key={item} style={{
            aspectRatio: '1',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '0.85rem',
            border: '2px dashed #e2e8f0',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6366f1'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            📸 Log #{item}
          </div>
        ))}
      </div> */}

     
    </div>
  );
};

export default ChallengeInfo;