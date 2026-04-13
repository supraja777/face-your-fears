import React, { useEffect } from 'react';

// Updated to match your Supabase schema
interface Challenge {
  id?: string;
  challenge_description: string;
  streak: number;
  tags?: string[];
  challenge_points?: number;
}

interface ChallengesGridProps {
  challenges: Challenge[];
  onSelect: (challenge: Challenge) => void;
}

const ChallengesGrid = ({ challenges, onSelect }: ChallengesGridProps) => {
  console.log("In challenge grid ", challenges);

   useEffect(() => {
     
    }, [challenges]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', 
      gap: '24px',
      padding: '4px'
    }}>
      {challenges.map((challenge, index) => (
        <div 
          key={challenge.id || index}
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
            overflow: 'hidden',
            minHeight: '200px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.borderColor = '#6366f1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = '#f1f5f9';
          }}
        >
          {/* Background Decor */}
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
              🚀
            </div>
            
            <h4 style={{ 
              margin: 0, 
              fontSize: '1.25rem', 
              fontWeight: '800', 
              color: '#0f172a',
              lineHeight: '1.3' 
            }}>
              {challenge.challenge_description}
            </h4>
            
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {challenge.tags?.slice(0, 2).map((tag, i) => (
                <span key={i} style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              backgroundColor: '#f0fdf4',
              color: '#16a34a',
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '0.85rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>🔥</span> {challenge.streak} Day Streak
            </div>
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6366f1',
                fontWeight: 'bold'
            }}>
              →
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengesGrid;