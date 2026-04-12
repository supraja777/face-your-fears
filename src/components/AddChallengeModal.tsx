import React, { useState } from 'react';

interface AddChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddChallengeModal = ({ isOpen, onClose, onAdd }: AddChallengeModalProps) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name);
      setName('');
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
    }}>
      <div style={{
        backgroundColor: 'white', width: '400px', padding: '32px', borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: '800' }}>New Challenge</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>What fear are you conquering next?</p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>Challenge Name</label>
            <input 
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Cold Showers"
              style={{
                padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc', outline: 'none', fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: '14px', borderRadius: '12px', border: 'none',
              backgroundColor: '#f1f5f9', color: '#64748b', fontWeight: '700', cursor: 'pointer'
            }}>Cancel</button>
            <button type="submit" style={{
              flex: 2, padding: '14px', borderRadius: '12px', border: 'none',
              backgroundColor: '#6366f1', color: 'white', fontWeight: '700', cursor: 'pointer'
            }}>Create Challenge</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChallengeModal;