import React, { useState, useEffect } from 'react';
import CongratulationsModal from './CongratulationsModal';
import { isValidPhoto } from '../utils/verify_image'; // This should now handle the date check
import { addPhotoToChallenge, uploadToCloudinary } from '../database/challenge_utils';

interface EvidenceItem {
  url: string;
  date: string;
  notes: string;
}

interface ChallengeLogFormProps {
  selectedChallengePhotos: [] | null,
  challengeId: string | null;
  challengeName: string | null;
  streak: number | null;
  description: string | null;
  setEvidenceGallery: React.Dispatch<React.SetStateAction<EvidenceItem[]>>;
  refreshChallenges: () => Promise<void>;
}

const ChallengeLogForm = ({ 
  selectedChallengePhotos,
  challengeId, 
  streak, 
  description, 
  refreshChallenges 
}: ChallengeLogFormProps) => {
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null); // Fixed type
  const [notification, setNotification] = useState<{ show: boolean; message: string; isSuccess: boolean }>({ 
    show: false, 
    message: '', 
    isSuccess: false 
  });

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the actual file for date validation
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
    // Basic validation before starting
    if (!base64Image || !selectedImage || !challengeId || !imageFile) {
      setNotification({
        show: true,
        message: "Please upload a photo first!",
        isSuccess: false
      });
      return;
    }
    
    setIsAuditing(true);
    
    try {
      // 1. DATE & AI CONTENT VERIFICATION
      // Ensure isValidPhoto accepts (File, string, string)
      const result = await isValidPhoto(imageFile, base64Image, description || "Task");

      if (result.verified) {
        // 2. CLOUDINARY UPLOAD
        const cloudinaryUrl = await uploadToCloudinary(selectedImage);

        if (cloudinaryUrl) {
          // 3. DATABASE SAVE
          const isSaved = await addPhotoToChallenge(challengeId, cloudinaryUrl, notes);

          if (isSaved) {
            await refreshChallenges();
            setNotification({ 
              show: true, 
              message: "Mission Complete! ✨ Your progress is saved.", 
              isSuccess: true 
            });
            
            // Reset Form
            setSelectedImage(null);
            setBase64Image(null);
            setImageFile(null);
            setNotes('');
            setIsAuditing(false);
            
            setTimeout(() => setShowModal(true), 800);
          }
        }
      } else {
        // Verification failed (Either wrong date or AI didn't recognize content)
        setNotification({ 
          show: true, 
          message: result.message, // Shows "Please upload today's photo" or AI error
          isSuccess: false 
        });
         setSelectedImage(null);
            setBase64Image(null);
            setImageFile(null);
            setNotes('');
            setIsAuditing(false);
      }
    } catch (error) {
      console.error("Save process failed:", error);
      setNotification({ 
        show: true, 
        message: "Network error. Please try again.", 
        isSuccess: false 
      });
       setSelectedImage(null);
            setBase64Image(null);
            setImageFile(null);
            setNotes('');
            setIsAuditing(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
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

      {showModal && <CongratulationsModal isOpen={showModal} onClose={() => setShowModal(false)} />}

      <div style={{
        backgroundColor: '#ffffff', borderRadius: '48px', padding: '48px', height: '100%', width: '100%',
        boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
        fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.03)',
        border: '1px solid #f1f5f9', overflow: 'hidden'
      }}>
        <header style={{ marginBottom: '32px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.6rem' }}>🚀</span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Daily Check-in</h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>Protect your {streak || 0} day streak.</p>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '28px', minHeight: 0 }}>
          <section style={{ flexShrink: 0 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '12px' }}>Proof of Work</label>
            <div onClick={() => !selectedImage && document.getElementById('file-upload')?.click()}
              style={{ border: selectedImage ? 'none' : '2px dashed #e2e8f0', borderRadius: '32px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', cursor: selectedImage ? 'default' : 'pointer', overflow: 'hidden', position: 'relative' }}>
              {selectedImage ? (
                <div style={{ width: '100%', height: '100%', animation: 'fadeIn 0.4s ease' }}>
                  <img src={selectedImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={(e) => { e.stopPropagation(); setSelectedImage(null); setImageFile(null); }} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>×</button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📸</div>
                  <p style={{ margin: 0, fontWeight: '700', color: '#334155' }}>Upload Today's Work</p>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </div>
              )}
            </div>
          </section>

          <section style={{ backgroundColor: '#f1f5f9', borderRadius: '32px', padding: '28px', flexShrink: 0 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '14px' }}>Reflection</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What did you learn today?"
              style={{ width: '100%', height: '120px', background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: '1.1rem', color: '#1e293b', fontFamily: 'inherit', lineHeight: '1.6' }}
            />
          </section>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px', flexShrink: 0 }}>
          <button onClick={handleSaveEntry} disabled={isAuditing}
            style={{ 
              width: '100%', padding: '22px', 
              background: isAuditing ? '#cbd5e1' : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', 
              color: '#ffffff', border: 'none', borderRadius: '24px', fontWeight: '800', fontSize: '1.1rem', 
              cursor: isAuditing ? 'not-allowed' : 'pointer', 
              boxShadow: isAuditing ? 'none' : '0 10px 25px -5px rgba(79, 70, 229, 0.4)' 
            }}>
            {isAuditing ? "✨ Verifying Evidence..." : "Complete Mission"}
          </button>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </>
  );
};

export default ChallengeLogForm;