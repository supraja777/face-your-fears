import React, { useState, useEffect } from 'react';
import { analyzeEvidenceWithGroq } from '../utils/groq_api_utils';
import CongratulationsModal from './CongratulationsModal';

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
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string; isSuccess: boolean }>({ show: false, message: '', isSuccess: false });

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

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
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEntry = async () => {
    if (!base64Image) return;
    setIsAuditing(true);
    try {
      const result = await analyzeEvidenceWithGroq(base64Image, description || "Task");
      if (result.verified) {
        setNotification({ show: true, message: "Analysis done! Photo is valid ✨", isSuccess: true });
        setTimeout(() => setShowModal(true), 1000);
      } else {
        setNotification({ show: true, message: "Analysis done. Photo is not valid, try again.", isSuccess: false });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <>
      <div style={{
        position: 'fixed', top: '30px', right: '30px', zIndex: 10000,
        backgroundColor: notification.isSuccess ? '#10b981' : '#f87171', color: 'white',
        padding: '16px 24px', borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px',
        transform: notification.show ? 'translateX(0)' : 'translateX(120%)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <span>{notification.isSuccess ? '✅' : '❌'}</span> {notification.message}
      </div>

      {showModal && <CongratulationsModal isOpen = {showModal}  onClose={() => setShowModal(false)} />}

      <div style={{
        backgroundColor: '#ffffff', borderRadius: '48px', padding: '48px', height: '820px', width: '100%',
        boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.03)',
        border: '1px solid #f1f5f9', overflow: 'hidden'
      }}>
        <header style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>🚀</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Daily Check-in</h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>Protect your {streak || 0} day streak.</p>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <section>
            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '12px' }}>Proof of Work</label>
            <div onClick={() => !selectedImage && document.getElementById('file-upload')?.click()}
              style={{ border: selectedImage ? 'none' : '2px dashed #e2e8f0', borderRadius: '32px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', cursor: selectedImage ? 'default' : 'pointer', overflow: 'hidden', position: 'relative' }}>
              {selectedImage ? (
                <div style={{ width: '100%', height: '100%', animation: 'fadeIn 0.4s ease' }}>
                  <img src={selectedImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>×</button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📸</div>
                  <p style={{ margin: 0, fontWeight: '700', color: '#334155' }}>Drop screenshot</p>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </div>
              )}
            </div>
          </section>

          <section style={{ backgroundColor: '#f1f5f9', borderRadius: '32px', padding: '28px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '14px' }}>Reflection</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What did you learn today?"
              style={{ width: '100%', height: '120px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '1.1rem', color: '#1e293b', fontFamily: 'inherit', lineHeight: '1.6' }}
            />
          </section>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
          <button onClick={handleSaveEntry} disabled={isAuditing}
            style={{ width: '100%', padding: '22px', background: isAuditing ? '#e2e8f0' : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', color: '#ffffff', border: 'none', borderRadius: '24px', fontWeight: '800', fontSize: '1.1rem', cursor: isAuditing ? 'not-allowed' : 'pointer', boxShadow: isAuditing ? 'none' : '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}>
            {isAuditing ? "✨ Verifying..." : "Complete Mission"}
          </button>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes popIn { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </>
  );
};

export default ChallengeLogForm;