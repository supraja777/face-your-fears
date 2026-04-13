import { useState, useEffect } from 'react';
import ChallengesGrid from "./ChallengesGrid";
import CongratulationsModal from "./CongratulationsModal";
import ChallengeInfo from "./ChallengeInfo";
import AddChallengeModal from "./AddChallengeModal";
import { createChallenge, getChallengesByUserId } from "../database/challenge_utils"; // Import your utility

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

    const handleAddChallenge = async (newChallengeData: { name: string; description: string; difficulty: string }) => {
    try {
      // 1. Map difficulty strings to point values
      const pointMapping: Record<string, number> = {
        'xs': 10,
        's': 20,
        'm': 50,
        'l': 100,
        'xl': 200
      };

      // Normalize the input difficulty to lowercase to match the mapping
      const difficultyKey = newChallengeData.difficulty.toLowerCase();
      const points = pointMapping[difficultyKey] || 0;

      // 2. Prepare the data for Supabase
      const newChallengePayload = {
        user_id: "4c9e5a57-6fe1-471d-b6bc-8a87af0f58aa", // Use your active User ID
        challenge_description: newChallengeData.description,
        streak: 0,
        photos: [], // Start with an empty gallery
        tags: [newChallengeData.difficulty], // Store ['XS'], ['M'], etc.
        challenge_points: points
      };

      // 3. Call the Supabase utility
      // This will return the new database record including the generated ID
      const createdChallenge = await createChallenge(newChallengePayload);

      if (createdChallenge) {
        console.log("New Challenge Created with ID:", createdChallenge.id);
        
        // 4. Refresh your UI list to show the new challenge
        // This ensures your "Left Component" list stays in sync
        await fetchChallenges("4c9e5a57-6fe1-471d-b6bc-8a87af0f58aa");

        // 5. Success UI
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to create challenge:", error);
      // Optionally add a notification for the user here
    }
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