import React from 'react';

interface Challenge {
  name: string;
}

interface ChallengesGridProps {
  challenges: Challenge[];
}

const ChallengesGrid = ({ challenges }: ChallengesGridProps) => {
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '24px', 
      width: '100%',
      marginTop: '40px',
      paddingBottom: '40px'
    }}>
      {challenges.map((challenge, index) => (
        <div 
          key={index}
          style={{
            position: 'relative',
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.03), 0 4px 6px -4px rgba(0, 0, 0, 0.03)';
            e.currentTarget.style.borderColor = '#f1f5f9';
          }}
        >
          {/* Subtle Background Accent */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
            borderRadius: '50%',
          }} />

          {/* Icon Container */}
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            marginBottom: '20px',
            boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.3)'
          }}>
            <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🔥</span>
          </div>

          <h3 style={{ 
            fontSize: '1.4rem', 
            fontWeight: '700', 
            color: '#1e293b', 
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em'
          }}>
            {challenge.name}
          </h3>

          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b', 
            margin: '0 0 24px 0', 
            lineHeight: '1.5' 
          }}>
            Push your boundaries and conquer this fear to boost your score.
          </p>

          {/* Action Footer */}
          <div style={{ 
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '1px solid #f8fafc'
          }}>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: '600', 
              color: '#6366f1',
              backgroundColor: '#f5f3ff',
              padding: '4px 12px',
              borderRadius: '99px'
            }}>
              +50 Points
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#94a3b8' }}>
              Start →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengesGrid;