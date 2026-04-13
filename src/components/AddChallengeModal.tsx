import React, { useState } from 'react';

interface AddChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (challenge: { name: string; description: string; difficulty: string }) => void;
}

const AddChallengeModal = ({ isOpen, onClose, onAdd }: AddChallengeModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('M');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      // Pass the data back to LeftComponent
      onAdd({ name, description, difficulty });

      // Reset local form state
      setName('');
      setDescription('');
      setDifficulty('M');

      // Close the current modal
      onClose();
    }
  };

  // Common font style to keep things consistent
  const fontStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    letterSpacing: '-0.01em'
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000,
      ...fontStyle
    }}>
      <div style={{
        backgroundColor: 'white', width: '480px', padding: '40px', borderRadius: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🚀</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.8rem', fontWeight: '800' }}>
            New Mission
          </h3>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '32px', fontWeight: '500' }}>
            What fear are you <span style={{ color: '#6366f1', fontWeight: '700' }}>conquering</span> next?
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              The Challenge
            </label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Public Speaking"
              style={{
                padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc', outline: 'none', fontSize: '0.95rem',
                fontWeight: '500', fontFamily: 'inherit', color: '#1e293b'
              }}
            />
          </div> */}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Challenge
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Define what success looks like..."
              style={{
                padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc', outline: 'none', fontSize: '0.95rem',
                minHeight: '100px', resize: 'none', fontFamily: 'inherit', color: '#1e293b'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Fear Magnitude
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setDifficulty(size)}
                  style={{
                    flex: 1, padding: '12px 0', borderRadius: '14px', border: '2px solid',
                    borderColor: difficulty === size ? '#6366f1' : 'transparent',
                    backgroundColor: difficulty === size ? '#ffffff' : '#f8fafc',
                    color: difficulty === size ? '#6366f1' : '#64748b',
                    fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    boxShadow: difficulty === size ? '0 4px 12px rgba(99, 102, 241, 0.15)' : 'none'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: '18px', borderRadius: '18px', border: 'none',
              backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: '700',
              cursor: 'pointer', fontFamily: 'inherit'
            }}>Abandon</button>
            <button type="submit" style={{
              flex: 2, padding: '18px', borderRadius: '18px', border: 'none',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: 'white', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.3)'
            }}>Commit to Growth</button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AddChallengeModal;