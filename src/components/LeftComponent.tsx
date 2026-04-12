import { useState } from 'react';
import { UserProfile } from "../types/UserProfile";
import ChallengesGrid from "./ChallengesGrid";
import CongratulationsModal from "./CongratulationsModal";
import ChallengeInfo from "./ChallengeInfo";

export const LeftComponent = ({ user }: { user: UserProfile | null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  const challengeContent = [
    // { name: "Public Speaking", streak: 150 },
    { name: "Cold Outreach", streak: 150 },
    { name: "Networking Event", streak: 150 },
    { name: "Live Coding", streak: 150 },
    { name: "Skydiving", streak: 150 },
    { name: "Deep Sea Diving", streak: 150 },
    { name: "Heights", streak: 150 },
    { name: "Spiders", streak: 150 }
  ];

  return (
    <section style={{ flex: '0 0 70%', height: 'calc(100vh - 70px)', padding: '32px', boxSizing: 'border-box', overflow: 'hidden' }}>
      <CongratulationsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: '100%', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
        
        {!selectedChallenge && (
          <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Workspace</h2>
              <p style={{ color: '#64748b', fontSize: '1.15rem', marginTop: '8px' }}>
                Welcome back, <span style={{ color: '#6366f1', fontWeight: '700' }}>{user?.full_name || 'Supraja'}</span>
              </p>
            </div>
            <button onClick={() => setIsModalOpen(true)} style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}>
              + Add Challenge
            </button>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '12px', marginRight: '-12px' }}>
          {selectedChallenge ? (
            <ChallengeInfo challenge={selectedChallenge} onBack={() => setSelectedChallenge(null)} />
          ) : (
            <ChallengesGrid challenges={challengeContent} onSelect={(c) => setSelectedChallenge(c)} />
          )}
        </div>
      </div>
      <style>{` ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; } `}</style>
    </section>
  );
};