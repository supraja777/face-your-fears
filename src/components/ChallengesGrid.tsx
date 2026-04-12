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
      gridTemplateColumns: 'repeat(2, 1fr)', // Strict 2-per-row requirement
      gap: '24px', 
      width: '100%',
      marginTop: '40px'
    }}>
      {challenges.map((challenge, index) => (
        <div 
          key={index}
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6366f1';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ 
            width: '40px', height: '40px', backgroundColor: '#eef2ff', 
            borderRadius: '10px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', fontSize: '1.2rem' 
          }}>
            🚀
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1e293b', margin: 0 }}>
            {challenge.name}
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Face this fear to level up.
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChallengesGrid;