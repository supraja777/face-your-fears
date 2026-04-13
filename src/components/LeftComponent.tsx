import { useState, useEffect } from 'react';
import ChallengesGrid from "./ChallengesGrid";
import CongratulationsModal from "./CongratulationsModal";
import ChallengeInfo from "./ChallengeInfo";
import AddChallengeModal from "./AddChallengeModal";
import { getChallengesByUserId } from "../database/challenge_utils"; // Import your utility

interface LeftProps {
  challenges: any[];
  user: any;
  selectedChallenge: any;
  setSelectedChallenge: (c: any) => void;
  fetchChallenges: (c : any) => void;
}

export const LeftComponent = ({ challenges, user, selectedChallenge, setSelectedChallenge, fetchChallenges }: LeftProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const[loading, setLoading] = useState(false)
  
  // --- FETCH DATA ON MOUNT ---
  useEffect(() => {
    console.log("In use Effect user id ", user)
    fetchChallenges("45a43e83-d65b-4dfc-af7a-821259632c52");
  }, [user]);

  const handleAddChallenge = (newChallengeData: { name: string; description: string; difficulty: string }) => {
    // Note: In a real app, you would call createChallenge() utility here, 
    // then re-fetch or update state with the returned DB object.
    const newEntry = { 
      challenge_description: newChallengeData.description, 
      streak: 0, 
      tags: [newChallengeData.difficulty] 
    };
    
  
    setIsSuccessModalOpen(true);
  };

  return (
    <section style={{ flex: '0 0 70%', height: 'calc(100vh - 70px)', padding: '32px', boxSizing: 'border-box' }}>
      
      <CongratulationsModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
      />

      <AddChallengeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddChallenge}
      />

      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '32px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {!selectedChallenge && (
          <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Workspace</h2>
              <p style={{ color: '#64748b', fontSize: '1.15rem', marginTop: '8px' }}>
                Welcome back, <span style={{ color: '#6366f1', fontWeight: '700' }}>{user?.full_name || 'Supraja'}</span>
              </p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)} 
              style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}
            >
              + Add Challenge
            </button>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
               <p style={{ color: '#64748b', fontWeight: '600' }}>Loading your challenges...</p>
            </div>
          ) : selectedChallenge ? (
            <ChallengeInfo challenge={selectedChallenge} onBack={() => setSelectedChallenge(null)} />
          ) : (
            <ChallengesGrid challenges={challenges} onSelect={(c) => setSelectedChallenge(c)} />
          )}
        </div>
      </div>
    </section>
  );
};