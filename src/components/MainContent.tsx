import React, { useState } from 'react';
import { UserProfile } from "../types/UserProfile";
import ChallengeLogForm from "./ChallengeLogForm";
import { LeftComponent } from "./LeftComponent";
import MotivationComponent from "./MotivationComponent";

interface MainContentProps {
  user: UserProfile | null; 
  activeChallenge: boolean | null;
  selectedChallenge: { 
    id: string; // Ensure your object has an ID for DB updates
    name: string; 
    streak: number; 
    challenge_description: string | null ;
  } | null;
  setSelectedChallenge: (c: any | null) => void;
  onRefresh: () => Promise<void>;
  fetchChallenges: (c : any) => void;
}

const MainContent = ({ challenges, fetchChallenges, user, selectedChallenge, setSelectedChallenge, onRefresh }: MainContentProps) => {
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
      backgroundColor: '#f8fafc', // Global light gray background
      overflow: 'hidden',
    }}>
      
      {/* LEFT STAGE */}
      <section style={{ 
        flex: isLogging ? '0 0 50%' : '1', 
        height: '100%',
        overflowY: 'auto',
        padding: '32px', 
        boxSizing: 'border-box',
        transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <LeftComponent 
          user={user} 
          challenges = {challenges}
          fetchChallenges = {fetchChallenges}
          selectedChallenge={selectedChallenge} 
          setSelectedChallenge={setSelectedChallenge} 
        />
      </section>

      {/* RIGHT STAGE */}
      <aside style={{ 
        flex: isLogging ? '0 0 50%' : '0 0 0%', 
        backgroundColor: '#f8fafc', 
        borderLeft: isLogging ? '1px solid #e2e8f0' : 'none',
        height: '100%',
        padding: '32px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        display: isLogging ? 'block' : 'none'
      }}>
        {selectedChallenge ? (
          <ChallengeLogForm 
            challengeId={selectedChallenge.id} // Added ID
            challengeName={selectedChallenge.name} 
            streak={selectedChallenge.streak} 
            description={selectedChallenge.challenge_description}
            setEvidenceGallery={setEvidenceGallery} // Pass setter
            refreshChallenges={handleRefreshChallenges} // Pass refresh trigger
          />
        ) : (
          <MotivationComponent />
        )}
      </aside>
    </main>
  );
};

export default MainContent;