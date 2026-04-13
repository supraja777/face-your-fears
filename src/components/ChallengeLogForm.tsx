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
    const result = await analyzeEvidenceWithGroq(base64Image, description || "Task");
    setAuditResult(result);
    setIsAuditing(false);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '40px',
      padding: '40px',
      height: '820px', // Fixed height for a consistent dashboard look
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.03)',
      border: '1px solid #f1f5f9',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative background element for a "Happy" vibe */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(255,255,255,0) 70%)',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Header: Friendly & Clean */}
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.5rem' }}>🚀</span>
            <h2 style={{ 
              fontSize: '2.2rem', 
              fontWeight: '800', 
              color: '#0f172a', 
              margin: 0, 
              letterSpacing: '-0.03em' 
            }}>
              Daily Check-in
            </h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
            You're on a **{streak || 1} day** streak! Keep that momentum.
          </p>
        </header>

        {/* Scrollable Content Zone */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingRight: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }} className="hide-scrollbar">
          
          {/* Upload Card */}
          <section>
            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>
              Proof of Work
            </label>
            <div 
              onClick={() => !selectedImage && document.getElementById('file-upload')?.click()}
              style={{
                border: selectedImage ? 'none' : '2px dashed #e2e8f0',
                borderRadius: '30px',
                height: '240px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8fafc',
                cursor: selectedImage ? 'default' : 'pointer',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.2s ease'
              }}
            >
              {selectedImage ? (
                <div style={{ width: '100%', height: '100%' }}>
                  <img src={selectedImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    style={{ 
                      position: 'absolute', top: '15px', right: '15px', 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', color: 'white', 
                      border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' 
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📸</div>
                  <p style={{ margin: 0, fontWeight: '700', color: '#334155' }}>Drop your screenshot</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>JPG, PNG or GIF</p>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </div>
              )}
            </div>
          </section>

          {/* Reflection Card */}
          <section style={{ 
            backgroundColor: '#f1f5f9', 
            borderRadius: '30px', 
            padding: '24px', 
            transition: 'background 0.3s ease' 
          }}>
            <label style={{ 
              fontSize: '0.75rem', fontWeight: '800', color: '#6366f1', 
              textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' 
            }}>
              What went well?
            </label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reflect on your wins today..."
              style={{ 
                width: '100%', height: '100px', background: 'transparent', 
                border: 'none', outline: 'none', resize: 'none', fontSize: '1.05rem', 
                color: '#1e293b', fontFamily: 'inherit', lineHeight: '1.5'
              }}
            />
          </section>

          {/* AI Result Feedback (Smooth appearance) */}
          {auditResult && (
            <div style={{
              padding: '20px', borderRadius: '24px',
              backgroundColor: auditResult.verified ? '#ecfdf5' : '#fff7ed',
              border: `1px solid ${auditResult.verified ? '#d1fae5' : '#ffedd5'}`,
              display: 'flex', gap: '16px', animation: 'slideIn 0.3s ease-out'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{auditResult.verified ? '🎉' : '🤔'}</span>
              <div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: auditResult.verified ? '#065f46' : '#9a3412', fontWeight: '700' }}>
                  {auditResult.verified ? 'Verification Success!' : 'Almost there...'}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: auditResult.verified ? '#047857' : '#c2410c' }}>
                  {auditResult.reason}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Prominent Action Button */}
        <div style={{ marginTop: '32px' }}>
          <button 
            onClick={handleSaveEntry}
            disabled={isAuditing}
            style={{
              width: '100%',
              padding: '22px',
              background: isAuditing ? '#e2e8f0' : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '24px',
              fontWeight: '800',
              fontSize: '1.1rem',
              cursor: isAuditing ? 'not-allowed' : 'pointer',
              boxShadow: isAuditing ? 'none' : '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => !isAuditing && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !isAuditing && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {isAuditing ? "✨ Analyzing Evidence..." : "Complete Mission"}
          </button>
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default ChallengeLogForm;