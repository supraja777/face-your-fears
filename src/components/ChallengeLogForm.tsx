import React from 'react';

interface ChallengeLogFormProps {
  challengeName: string | null;
  streak: number | null;
}

const ChallengeLogForm = ({ challengeName, streak }: ChallengeLogFormProps) => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      padding: '32px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      <div>
        <span style={{ 
          backgroundColor: '#f0fdf4', 
          color: '#16a34a', 
          padding: '4px 12px', 
          borderRadius: '99px', 
          fontSize: '0.75rem', 
          fontWeight: '800' 
        }}>
          LOG PROGRESS
        </span>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '8px 0' }}>
          {challengeName}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>Notes</label>
        <textarea 
          placeholder="What did you learn today?"
          style={{
            width: '100%',
            height: '120px',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            fontFamily: 'inherit',
            resize: 'none',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>Difficulty</label>
          <select style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none' }}>
            <option>Easy</option>
            <option>Moderate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>Current Streak</label>
          <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#fff7ed', color: '#ea580c', fontWeight: '800', textAlign: 'center', border: '1px solid #ffedd5' }}>
            {streak} Days
          </div>
        </div>
      </div>

      <button style={{
        marginTop: 'auto',
        padding: '18px',
        backgroundColor: '#0f172a',
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        Save Entry
      </button>
    </div>
  );
};

export default ChallengeLogForm;