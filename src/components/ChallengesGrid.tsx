import React from 'react';

interface Challenge {
  name: string;
  streak: number;
}

interface ChallengesGridProps {
  challenges: Challenge[];
  onSelect: (challenge: Challenge) => void;
}

const ChallengesGrid = ({ challenges, onSelect }: ChallengesGridProps) => {
  return (
    <div style={{
      display: 'grid',
      // This forces exactly 2 columns per row
      gridTemplateColumns: '1fr 1fr', 
      gap: '24px',
      padding: '4px'
    }}>
      {challenges.map((challenge, index) => (
        <div 
          key={index}
          onClick={() => onSelect(challenge)}
          style={{
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid #f1f5f9',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = '#f1f5f9';
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            fontSize: '5rem',
            opacity: 0.03,
            userSelect: 'none'
          }}>
            🔥
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              fontSize: '1.8rem', 
              marginBottom: '16px',
              display: 'inline-block',
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '16px'
            }}>
              🔥
            </div>
            
            <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>
              {challenge.name}
            </h4>
            <p style={{ 
            margin: 0, 
            fontSize: '0.9rem', 
            color: '#64748b', 
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2, // Limits to 2 lines
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {challenge.description || "No objective set."}
          </p>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              backgroundColor: '#f0fdf4',
              color: '#16a34a',
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '0.85rem',
              fontWeight: '700'
            }}>
              {challenge.streak} Day Streak
            </div>
            <span style={{ color: '#6366f1', fontSize: '1.2rem', fontWeight: '700' }}>→</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengesGrid;