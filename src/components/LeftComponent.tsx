import { useState, useEffect } from 'react';
import ChallengesGrid from "./ChallengesGrid";
import CongratulationsModal from "./CongratulationsModal";
import ChallengeInfo from "./ChallengeInfo";
import AddChallengeModal from "./AddChallengeModal";
import { createChallenge } from "../database/challenge_utils";

interface LeftProps {
  challenges: any[];
  user: any;
  selectedChallenge: any;
  setSelectedChallenge: (c: any) => void;
  fetchChallenges: (userId: string) => void;
}

export const LeftComponent = ({ challenges, user, selectedChallenge, setSelectedChallenge, fetchChallenges }: LeftProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  // Check if user exists AND has an id property before calling the function
  if (user && user.id) {
    fetchChallenges(user.id);
  } else {
    console.log("Waiting for user data to load...");
  }
}, [user]);

const handleAddChallenge = async (newChallengeData: { name: string; description: string; difficulty: string }) => {
  // 1. ADD THIS GUARD: If user is missing, stop immediately
  if (!user || !user.id) {
    alert("User session not found. Please try logging in again.");
    return;
  }

  try {
    const pointMapping: Record<string, number> = {
      'xs': 10, 's': 20, 'm': 50, 'l': 100, 'xl': 200
    };

    const difficultyKey = newChallengeData.difficulty.toLowerCase();
    const points = pointMapping[difficultyKey] || 0;

    const newChallengePayload = {
      user_id: user.id, // Now safe because of the guard above
      challenge_description: newChallengeData.description,
      streak: 0,
      photos: [],
      tags: [newChallengeData.difficulty],
      challenge_points: points
    };

    const createdChallenge = await createChallenge(newChallengePayload);

    if (createdChallenge) {
      await fetchChallenges(user.id);
      setIsSuccessModalOpen(true);
    }
  } catch (error) {
    console.error("Failed to create challenge:", error);
  }
};

  // const handleAddChallenge = async (newChallengeData: { name: string; description: string; difficulty: string }) => {
  //   try {
  //     const pointMapping: Record<string, number> = {
  //       'xs': 10, 's': 20, 'm': 50, 'l': 100, 'xl': 200
  //     };

  //     const difficultyKey = newChallengeData.difficulty.toLowerCase();
  //     const points = pointMapping[difficultyKey] || 0;

  //     const newChallengePayload = {
  //       user_id: user.id,
  //       challenge_description: newChallengeData.description,
  //       streak: 0,
  //       photos: [],
  //       tags: [newChallengeData.difficulty],
  //       challenge_points: points
  //     };

  //     const createdChallenge = await createChallenge(newChallengePayload);

  //     if (createdChallenge) {
  //       await fetchChallenges(user.id);
  //       setIsSuccessModalOpen(true);
  //     }
  //   } catch (error) {
  //     console.error("Failed to create challenge:", error);
  //   }
  // };

  return (
    <section style={{ 
      flex: '0 0 70%', 
      height: '100%', 
      padding: '24px', 
      boxSizing: 'border-box',
      overflow: 'hidden' // Prevents the very outer section from scrolling
    }}>
      
      <CongratulationsModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
      />

      <AddChallengeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddChallenge}
      />

      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '32px', 
        borderRadius: '32px', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        boxSizing: 'border-box', // Crucial: Includes padding in the 100% height calculation
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
        border: '1px solid #f1f5f9'
      }}>
        
        {/* Header Section: Only shows when no challenge is selected */}
        {!selectedChallenge && (
          <div style={{ 
            marginBottom: '32px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            flexShrink: 0 
          }}>
            <div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.03em' }}>
                Workspace
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '6px' }}>
                Welcome back, <span style={{ color: '#6366f1', fontWeight: '700' }}>{user?.full_name || 'Supraja'}</span>
              </p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)} 
              style={{ 
                padding: '14px 28px', 
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '16px', 
                fontWeight: '700', 
                cursor: 'pointer', 
                boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              + Add Challenge
            </button>
          </div>
        )}

        {/* Content Wrapper */}
        <div style={{ 
          flex: 1, 
          overflow: 'hidden', // Forces children (Grid or Info) to handle their own internal space
          minHeight: 0,        // Critical secret for nested flex scroll issues
          display: 'flex',
          flexDirection: 'column'
        }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
               <p style={{ color: '#64748b', fontWeight: '600' }}>Updating mission logs...</p>
            </div>
          ) : selectedChallenge ? (
            <ChallengeInfo 
              challenge={selectedChallenge} 
              onBack={() => setSelectedChallenge(null)} 
            />
          ) : (
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
              <ChallengesGrid 
                challenges={challenges} 
                onSelect={(c) => setSelectedChallenge(c)} 
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};