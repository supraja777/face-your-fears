import React, { useState } from 'react';
import { analyzeEvidenceWithGroq } from '../utils/groq_api_utils';

interface ChallengeLogFormProps {
  challengeName: string | null;
  streak: number | null;
  description: string | null;
}

const ChallengeLogForm = ({ challengeName, streak, description }: ChallengeLogFormProps) => {
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{ verified: boolean; reason: string } | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const compressed = canvas.toDataURL('image/jpeg', 0.8);
          setSelectedImage(compressed);
          setBase64Image(compressed.split(',')[1]);
          setAuditResult(null);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEntry = async () => {
    if (!base64Image) return alert("Please upload proof first!");
    
    setIsAuditing(true);
    const taskToVerify = description || "LinkedIn Post";
    
    const result = await analyzeEvidenceWithGroq(base64Image, taskToVerify);
    setAuditResult(result);
    setIsAuditing(false);

    if (result.verified) {
      console.log("Verified! Saving entry...");
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '28px',
      padding: '32px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '480px',
      margin: '20px auto',
      boxSizing: 'border-box',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Header Section */}
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '6px 14px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em' }}>
            DAILY LOG
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.9rem', fontWeight: '700' }}>
            🔥 {streak ?? 0} Day Streak
          </div>
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
          {challengeName || "Current Challenge"}
        </h3>
      </header>

      {/* --- UPLOAD SECTION --- */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
          Proof of Work
        </label>
        
        <div style={{
          border: '2px dashed #e2e8f0',
          borderRadius: '20px',
          padding: selectedImage ? '12px' : '32px',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}>
          {selectedImage ? (
            <div style={{ position: 'relative', width: '100%' }}>
              <img 
                src={selectedImage} 
                alt="Preview" 
                style={{ width: '100%', maxHeight: '220px', borderRadius: '14px', objectFit: 'cover', display: 'block' }} 
              />
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', backdropFilter: 'blur(4px)' }}
              >
                ×
              </button>
            </div>
          ) : (
            <label style={{ cursor: 'pointer', display: 'block' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✨</div>
              <p style={{ margin: 0, fontWeight: '700', color: '#0f172a', fontSize: '0.95rem' }}>Drop your screenshot</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Tap to browse files</p>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          )}
        </div>
      </section>

      {/* Inputs Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569' }}>REFLECTIONS</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What was the highlight of your session?"
            style={{ width: '100%', height: '90px', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', outline: 'none', resize: 'none', fontSize: '0.95rem', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
            onFocus={(e) => e.target.style.borderColor = '#6366f1'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>
      </section>

      {/* Audit Result UI */}
      {auditResult && (
        <div style={{
          padding: '16px',
          borderRadius: '16px',
          backgroundColor: auditResult.verified ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${auditResult.verified ? '#dcfce7' : '#fee2e2'}`,
          display: 'flex',
          gap: '12px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <div style={{ fontSize: '1.2rem' }}>{auditResult.verified ? '✅' : '⚠️'}</div>
          <div>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '0.85rem', color: auditResult.verified ? '#166534' : '#991b1b' }}>
              {auditResult.verified ? "Verified by AI" : "Verification Failed"}
            </p>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: auditResult.verified ? '#15803d' : '#b91c1c', lineHeight: '1.4' }}>
              {auditResult.reason}
            </p>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={handleSaveEntry}
        disabled={isAuditing}
        style={{
          padding: '18px',
          backgroundColor: isAuditing ? '#e2e8f0' : '#0f172a',
          color: isAuditing ? '#94a3b8' : '#ffffff',
          border: 'none',
          borderRadius: '18px',
          fontWeight: '700',
          fontSize: '1rem',
          cursor: isAuditing ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        {isAuditing ? (
          <>
            <span style={{ width: '18px', height: '18px', border: '2px solid #94a3b8', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            Analyzing...
          </>
        ) : "Complete Entry"}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default ChallengeLogForm;