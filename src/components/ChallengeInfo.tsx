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
  challenge: Challenge;
  onBack: () => void;
}

const ChallengeInfo = ({ challenge, onBack }: ChallengeInfoProps) => {
  // Extracting difficulty from tags if it exists
  const difficulty = challenge.tags?.length ? challenge.tags[0] : 'Standard';
  // Calculate total XP: streak * base points
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
        // --- LAYOUT BOUNDARIES ---
        height: '100%',        // Fits exactly inside MainContent
        maxHeight: '100%',     // No vertical expansion
        overflow: 'hidden',    // Kills the outer scrollbar
        // -------------------------
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
        marginBottom: '28px',
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
            padding: '10px 18px',
            borderRadius: '14px',
            fontSize: '0.85rem',
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
          fontSize: '0.75rem',
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          border: '1px solid #dcfce7'
        }}>
          Active Mission
        </div>
      </div>

      {/* Hero Content Section */}
      <div style={{ marginBottom: '32px', flexShrink: 0 }}>
        <h3 style={{ 
          fontSize: '2.4rem', 
          fontWeight: '800', 
          color: '#0f172a', 
          margin: 0, 
          letterSpacing: '-0.03em',
          lineHeight: '1.1'
        }}>
          {challenge.challenge_description}
        </h3>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          {/* Streak Badge */}
          <div style={{ 
            backgroundColor: '#ecfdf5',
            color: '#059669', 
            padding: '8px 14px', 
            borderRadius: '12px', 
            fontSize: '0.85rem', 
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #d1fae5'
          }}>
            🔥 {challenge.streak} Day Streak
          </div>
          
          {/* XP Badge */}
          <div style={{ 
            backgroundColor: '#fffbeb', 
            color: '#d97706', 
            padding: '8px 14px', 
            borderRadius: '12px', 
            fontSize: '0.85rem', 
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid #fef3c7'
          }}>
            ⭐ +{totalXp} xp
          </div>

          <div style={{ 
            backgroundColor: '#f8fafc', 
            color: '#64748b', 
            padding: '8px 14px', 
            borderRadius: '12px', 
            fontSize: '0.85rem', 
            fontWeight: '700', 
            border: '1px solid #e2e8f0' 
          }}>
            Level: {difficulty}
          </div>
        </div>

        {/* Mission Objective Card */}
        <div style={{
          marginTop: '28px',
          padding: '24px',
          backgroundColor: '#f8fafc',
          borderRadius: '20px',
          border: '1px solid #f1f5f9',
          position: 'relative'
        }}>
          <h5 style={{ 
            margin: '0 0 10px 0', 
            color: '#6366f1', 
            fontSize: '0.7rem', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
          }}>
            Mission Detail
          </h5>
          <p style={{ 
            margin: 0, 
            color: '#475569', 
            fontSize: '1rem', 
            lineHeight: '1.6', 
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
        marginBottom: '28px',
        width: '100%',
        flexShrink: 0
      }} />

      {/* Gallery Section - Only this part handles scrolling */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: 0,     // Crucial: Allows the container to shrink
        overflow: 'hidden' 
      }}>
        <h4 style={{ 
          margin: '0 0 16px 0', 
          color: '#0f172a', 
          fontWeight: '800', 
          fontSize: '1.2rem',
          letterSpacing: '-0.01em',
          flexShrink: 0
        }}>
          Evidence Gallery
        </h4>
        
        <div className="no-scrollbar" style={{ 
          flex: 1, 
          overflowY: 'auto', // Internal scroll only for images
          minHeight: 0,
          paddingBottom: '20px'
        }}>
          <ImageGallery 
            photos={challenge.photos} 
            key={challenge.photos?.length || 0} 
          />
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ChallengeInfo;