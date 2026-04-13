import React, { useState } from 'react';
import { UserProfile } from "../types/UserProfile";
import ChallengeLogForm from "./ChallengeLogForm";
import { LeftComponent } from "./LeftComponent";
import MotivationComponent from "./MotivationComponent";

interface MainContentProps {
  selectedChallengePhotos: any[] | null;
  challenges: any[]; 
  user: UserProfile | null; 
  activeChallenge: boolean | null;
  selectedChallenge: { 
    id: string; 
    name: string; 
    streak: number; 
    challenge_description: string | null;
  } | null;
  setSelectedChallenge: (c: any | null) => void;
  onRefresh: () => Promise<void>;
  fetchChallenges: (c: any) => void;
}

const MainContent = ({ 
  selectedChallengePhotos, 
  challenges, 
  fetchChallenges, 
  user, 
  selectedChallenge, 
  setSelectedChallenge, 
  onRefresh 
}: MainContentProps) => {
  
  const isLogging = !!selectedChallenge;
  const [evidenceGallery, setEvidenceGallery] = useState<any[]>([]);

  const handleRefreshChallenges = async () => {
      await onRefresh();
  };

  return (
    <main style={{
      display: 'flex',
      marginTop: '70px',
      width: '100vw',
      height: 'calc(100vh - 70px)',
      backgroundColor: '#f8fafc', 
      overflow: 'hidden',
    }}>
      
      {/* LEFT STAGE */}
      <section style={{ 
        // We keep the left side at 50% or 60% so the right side is always there
        flex: isLogging ? '0 0 50%' : '0 0 60%', 
        height: '100%',
        overflowY: 'auto',
        padding: '32px', 
        boxSizing: 'border-box',
        transition: 'flex 0.5s ease',
      }}>
        <LeftComponent 
          user={user} 
          selectedChallengePhotos={selectedChallengePhotos}
          challenges={challenges}
          fetchChallenges={fetchChallenges}
          selectedChallenge={selectedChallenge} 
          setSelectedChallenge={setSelectedChallenge} 
        />
      </section>

      {/* RIGHT STAGE: Always visible now */}
      <aside style={{ 
        flex: isLogging ? '0 0 50%' : '0 0 40%', 
        backgroundColor: '#ffffff', 
        borderLeft: '1px solid #e2e8f0',
        height: '100%',
        padding: '32px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        transition: 'all 0.5s ease',
        display: 'block', // Crucial: Always block, never 'none'
      }}>
        {selectedChallenge ? (
          <ChallengeLogForm 
            selectedChallengePhotos={selectedChallengePhotos}
            challengeId={selectedChallenge.id}
            challengeName={selectedChallenge.name} 
            streak={selectedChallenge.streak} 
            description={selectedChallenge.challenge_description}
            setEvidenceGallery={setEvidenceGallery}
            refreshChallenges={handleRefreshChallenges}
          />
        ) : (
          /* This will now show on the right side by default */
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <MotivationComponent />
          </div>
        )}
      </aside>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
};

export default MainContent;