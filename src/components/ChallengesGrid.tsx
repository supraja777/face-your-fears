import React from 'react';

interface Challenge {
  name: string;
  streak: number;
}

interface ChallengesGridProps {
  challenges: Challenge[];
}

const ChallengesGrid = ({ challenges }: ChallengesGridProps) => {
  return (
    <div style={{ 
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px', 
      width: '100%',
      paddingBottom: '40px',
      justifyContent: 'center' 
    }}>
      {challenges.map((challenge, index) => (
        <div 
          key={index}
          style={{
            flex: '0 1 calc(50% - 12px)',
            minWidth: '300px',
            position: 'relative',
            backgroundColor: '#ffffff',
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.03)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.03)';
          }}
        >
          {/* Streak Badge */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fff7ed',
            padding: '6px 12px',
            borderRadius: '12px',
            border: '1px solid #ffedd5'
          }}>
            <span style={{ fontSize: '1rem' }}>🔥</span>
            <span style={{ 
              fontSize: '0.9rem', 
              fontWeight: '700', 
              color: '#ea580c' 
            }}>
              {challenge.streak}
            </span>
          </div>

          {/* Icon */}
          <div style={{ 
            width: '48px', height: '48px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            borderRadius: '14px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.4rem', marginBottom: '20px'
          }}>
            <span>🎯</span>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1e293b', margin: '0 0 12px 0', paddingRight: '60px' }}>
            {challenge.name}
          </h3>

          <p style={{ fontSize: '1rem', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.5' }}>
            Push your boundaries and conquer this fear.
          </p>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }}>Start →</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengesGrid;