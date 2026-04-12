import { useState } from 'react';
import ChallengesGrid from "./ChallengesGrid";
import CongratulationsModal from "./CongratulationsModal"; // Ensure this is imported
import ChallengeInfo from "./ChallengeInfo";
import AddChallengeModal from "./AddChallengeModal";

export const LeftComponent = ({ user, selectedChallenge, setSelectedChallenge }: LeftProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const [challenges, setChallenges] = useState([
    { name: "Cold Outreach", streak: 150 },
    { name: "Networking Event", streak: 150 }
  ]);

  const handleAddChallenge = (newChallengeData: { name: string; description: string; difficulty: string }) => {
    const newEntry = { name: newChallengeData.name, streak: 0 };
    
    // 1. Update the list
    setChallenges(prev => [newEntry, ...prev]);
    
    // 2. Show the celebration!
    setIsSuccessModalOpen(true);
  };

  return (
    <section style={{ flex: '0 0 70%', height: 'calc(100vh - 70px)', padding: '32px', boxSizing: 'border-box' }}>
      
      {/* Celebration Modal */}
      <CongratulationsModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
      />

      {/* Entry Form Modal */}
      <AddChallengeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddChallenge}
      />

      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
              style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}
            >
              + Add Challenge
            </button>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {selectedChallenge ? (
            <ChallengeInfo challenge={selectedChallenge} onBack={() => setSelectedChallenge(null)} />
          ) : (
            <ChallengesGrid challenges={challenges} onSelect={(c) => setSelectedChallenge(c)} />
          )}
        </div>
      </div>
    </section>
  );
};