import React from 'react';
import ImageGallery from './ImageGallery';

// Updated to match your database schema
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
  // Extracting difficulty from tags if it exists, otherwise defaulting to 'Standard'
  const difficulty = challenge.tags?.length ? challenge.tags[0] : 'Standard';

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
        boxSizing: 'border-box',
        animation: 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflowY: 'auto',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Navigation Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
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
            padding: '12px 20px',
            borderRadius: '16px',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6366f1';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = '#6366f1';
            e.currentTarget.style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc';
            e.currentTarget.style.color = '#64748b';
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Back
        </button>

        <div style={{
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          borderRadius: '12px',
          color: '#16a34a',
          fontSize: '0.85rem',
          fontWeight: '700',
          border: '1px solid #bbf7d0'
        }}>
          Active Mission
        </div>
      </div>

      {/* Hero Title Section */}
      <div style={{ marginBottom: '40px', flexShrink: 0 }}>
        <h3 style={{ 
          fontSize: '2.8rem', 
          fontWeight: '800', 
          color: '#0f172a', 
          margin: 0, 
          letterSpacing: '-0.04em',
          lineHeight: '1.1'
        }}>
          {challenge.challenge_description}
        </h3>
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#ffffff', 
            padding: '10px 18px', 
            borderRadius: '14px', 
            fontSize: '0.9rem', 
            fontWeight: '700',
            boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)'
          }}>
            🔥 {challenge.streak} Day Streak
          </div>
          
          <div style={{ 
            backgroundColor: '#ffffff', 
            color: '#475569', 
            padding: '10px 18px', 
            borderRadius: '14px', 
            fontSize: '0.9rem', 
            fontWeight: '700', 
            border: '1px solid #e2e8f0' 
          }}>
            Magnitude: {difficulty}
          </div>

          <div style={{ 
            backgroundColor: '#f1f5f9', 
            color: '#0f172a', 
            padding: '10px 18px', 
            borderRadius: '14px', 
            fontSize: '0.9rem', 
            fontWeight: '700'
          }}>
            Points: {challenge.challenge_points || 0}
          </div>
        </div>

        {/* Mission Objective Card */}
        <div style={{
          marginTop: '32px',
          padding: '28px',
          backgroundColor: '#f8fafc',
          borderRadius: '24px',
          border: '1px solid #f1f5f9',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-10px',
            fontSize: '5rem',
            opacity: '0.03',
            userSelect: 'none'
          }}>
            🎯
          </div>

          <h5 style={{ 
            margin: '0 0 12px 0', 
            color: '#6366f1', 
            fontSize: '0.75rem', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em' 
          }}>
            Mission Detail
          </h5>
          <p style={{ 
            margin: 0, 
            color: '#334155', 
            fontSize: '1.1rem', 
            lineHeight: '1.6', 
            fontWeight: '500' 
          }}>
            {/* Using description if available, otherwise utilizing tags as a summary */}
            Continuing your progress in {challenge.challenge_description}. 
            {challenge.tags?.length ? ` Focus areas: ${challenge.tags.join(', ')}.` : ""}
          </p>
        </div>
      </div>

      <div style={{ 
        height: '1px', 
        backgroundColor: '#f1f5f9', 
        marginBottom: '32px',
        width: '100%' 
      }} />

      {/* Gallery Section */}
      <div style={{ flex: 1 }}>
        <h4 style={{ 
          margin: '0 0 20px 0', 
          color: '#0f172a', 
          fontWeight: '800', 
          fontSize: '1.25rem',
          letterSpacing: '-0.02em'
        }}>
          Evidence Gallery
        </h4>
        <div className="no-scrollbar" style={{ overflowY: 'auto' }}>
          {/* Passing the actual photo array to the gallery if you've updated it */}
          {/* <ImageGallery photos={challenge.photos} /> */}
          <ImageGallery/>
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ChallengeInfo;