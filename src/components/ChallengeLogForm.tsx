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
          
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
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
      borderRadius: '24px',
      padding: '32px',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
        {challengeName || "Challenge Log"}
      </h3>

      {/* --- UPLOAD SECTION --- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>
          EVIDENCE (Required)
        </label>
        
        <div style={{
          border: '2px dashed #cbd5e1',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          position: 'relative'
        }}>
          {selectedImage ? (
            <div style={{ position: 'relative' }}>
              <img 
                src={selectedImage} 
                alt="Preview" 
                style={{ width: '100%', maxHeight: '200px', borderRadius: '12px', objectFit: 'contain' }} 
              />
              <button 
                onClick={() => setSelectedImage(null)}
                style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
          ) : (
            <label style={{ cursor: 'pointer', display: 'block' }}>
              <span style={{ fontSize: '2rem' }}>📷</span>
              <p style={{ margin: '8px 0 0 0', fontWeight: '600', color: '#6366f1' }}>Click to upload screenshot</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>PNG, JPG up to 10MB</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
              />
            </label>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>Notes</label>
        <textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you learn today?"
          style={{ width: '100%', height: '80px', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', resize: 'none' }}
        />
      </div>

      {auditResult && (
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: auditResult.verified ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${auditResult.verified ? '#bbf7d0' : '#fecaca'}`
        }}>
          <p style={{ margin: 0, fontWeight: '700', fontSize: '0.85rem', color: auditResult.verified ? '#15803d' : '#991b1b' }}>
            {auditResult.verified ? "✅ Verified" : "❌ Rejected"}
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: auditResult.verified ? '#166534' : '#b91c1c' }}>
            {auditResult.reason}
          </p>
        </div>
      )}

      <button 
        onClick={handleSaveEntry}
        disabled={isAuditing}
        style={{
          padding: '16px',
          backgroundColor: isAuditing ? '#94a3b8' : '#0f172a',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '700',
          cursor: isAuditing ? 'not-allowed' : 'pointer'
        }}
      >
        {isAuditing ? "Verifying..." : "Save Entry"}
      </button>
    </div>
  );
};

export default ChallengeLogForm;