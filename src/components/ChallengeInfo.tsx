import React from 'react';

interface ChallengeInfoProps {
  challenge: { name: string; streak: number };
  onBack: () => void;
}

const ChallengeInfo = ({ challenge, onBack }: ChallengeInfoProps) => {
  return (
    <div style={{
      animation: 'slideIn 0.4s ease-out',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navigation Header */}
      <button 
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#6366f1',
          fontWeight: '700',
          cursor: 'pointer',
          padding: '0 0 24px 0',
          fontSize: '1rem'
        }}
      >
        ← Back to Workspace
      </button>

      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        flex: 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ 
              backgroundColor: '#fff7ed', 
              color: '#ea580c', 
              padding: '4px 12px', 
              borderRadius: '99px', 
              fontSize: '0.85rem', 
              fontWeight: '700' 
            }}>
              ACTIVE CHALLENGE
            </span>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', margin: '12px 0' }}>
              {challenge.name}
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem' }}>🔥</div>
            <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1.2rem' }}>{challenge.streak} Day Streak</div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '24px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Next Milestone</h4>
            <p style={{ margin: 0, fontWeight: '700', color: '#0f172a' }}>Reach {challenge.streak + 10} days for a new badge</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Difficulty Level</h4>
            <p style={{ margin: 0, fontWeight: '700', color: '#0f172a' }}>Advanced</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ChallengeInfo;