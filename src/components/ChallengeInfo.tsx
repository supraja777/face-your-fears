import React from 'react';
import ImageGallery from './ImageGallery';

interface Challenge {
  id?: string;
  challenge_description: string;
  streak: number;
  tags?: string[];
  photos?: string[];
  challenge_points?: number;
}

interface ChallengeInfoProps {
  selectedChallengePhotos: [] 
  challenge: Challenge;
  onBack: () => void;
}

const ChallengeInfo = ({ selectedChallengePhotos, challenge, onBack }: ChallengeInfoProps) => {
  const difficulty = challenge.tags?.length ? challenge.tags[0] : 'Standard';
  const totalXp = (challenge.streak || 0) * (challenge.challenge_points || 0);

  return (
    <div 
      className="no-scrollbar" 
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '32px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        animation: 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Navigation Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px', // Reduced from 28px
        flexShrink: 0 
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            color: '#64748b',
            fontWeight: '700',
            cursor: 'pointer',
            padding: '8px 16px', // Slightly smaller padding
            borderRadius: '12px',
            fontSize: '0.8rem',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6366f1';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = '#6366f1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          ← Back to Grid
        </button>

        <div style={{
          padding: '6px 14px',
          background: '#f0fdf4',
          borderRadius: '10px',
          color: '#16a34a',
          fontSize: '0.7rem',
          fontWeight: '800',
          textTransform: 'uppercase',
          border: '1px solid #dcfce7'
        }}>
          Active Mission
        </div>
      </div>

      {/* Hero Content Section */}
      <div style={{ marginBottom: '24px', flexShrink: 0 }}>
        <h3 style={{ 
          fontSize: '2rem', // Reduced from 2.4rem to save space
          fontWeight: '800', 
          color: '#0f172a', 
          margin: 0, 
          letterSpacing: '-0.02em',
          lineHeight: '1.2'
        }}>
          {challenge.challenge_description}
        </h3>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <div style={{ 
            backgroundColor: '#ecfdf5', color: '#059669', padding: '6px 12px', 
            borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800',
            border: '1px solid #d1fae5'
          }}>
            🔥 {challenge.streak} Day Streak
          </div>
          
          <div style={{ 
            backgroundColor: '#fffbeb', color: '#d97706', padding: '6px 12px', 
            borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800',
            border: '1px solid #fef3c7'
          }}>
            ⭐ +{totalXp} xp
          </div>

          <div style={{ 
            backgroundColor: '#f8fafc', color: '#64748b', padding: '6px 12px', 
            borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700', 
            border: '1px solid #e2e8f0' 
          }}>
            Level: {difficulty}
          </div>
        </div>

        {/* Mission Objective Card - Slimmer version */}
        <div style={{
          marginTop: '16px',
          padding: '16px 20px',
          backgroundColor: '#f8fafc',
          borderRadius: '16px',
          border: '1px solid #f1f5f9',
        }}>
          <p style={{ 
            margin: 0, 
            color: '#475569', 
            fontSize: '0.95rem', 
            lineHeight: '1.5', 
            fontWeight: '500' 
          }}>
            Continuing your progress in {challenge.challenge_description}. 
            {challenge.tags?.length ? ` Key Focus: ${challenge.tags.join(', ')}.` : ""}
          </p>
        </div>
      </div>

      <div style={{ 
        height: '1px', 
        backgroundColor: '#f1f5f9', 
        marginBottom: '20px',
        width: '100%',
        flexShrink: 0
      }} />

      {/* Gallery Section - Maximized Space */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: 0, 
        overflow: 'hidden' 
      }}>
        <h4 style={{ 
          margin: '0 0 12px 0', 
          color: '#0f172a', 
          fontWeight: '800', 
          fontSize: '1.2rem',
          flexShrink: 0
        }}>
          Evidence Gallery
        </h4>
        
        <div className="no-scrollbar" style={{ 
          flex: 1, 
          overflowY: 'auto', 
          minHeight: 0,
          paddingBottom: '10px'
        }}>
          {/* Ensure ImageGallery grid columns are wide enough! */}
          <ImageGallery 
            photos={challenge.photos} 
            key={`gallery-${challenge.id}-${challenge.photos?.length || 0}`}
          />
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ChallengeInfo;