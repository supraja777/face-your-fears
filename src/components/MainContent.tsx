import { UserProfile } from "../types/UserProfile";
import ChallengeLogForm from "./ChallengeLogForm";
import { LeftComponent } from "./LeftComponent";
import MotivationComponent from "./MotivationComponent";
// --- Right Component (30%) ---

interface MainContentProps {
  user: UserProfile | null,
  activeChallenge: Boolean | null
  selectedChallenge: { name: string; streak: number }
  setSelectedChallenge: (c: string | null) => void;
}

const MainContent = ({ user, selectedChallenge, setSelectedChallenge }: MainContentProps) => {
  return (
    <main style={{
      display: 'flex',
      flex: 1,
      marginTop: '70px',
      width: '100%',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <LeftComponent user={user} selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} />
      <div style={{ flex: '0 0 30%', borderLeft: '1px solid #e2e8f0' }}>
        {selectedChallenge && (
          <ChallengeLogForm challengeName= {selectedChallenge.name}  streak={selectedChallenge.streak} challengeDescription = {selectedChallenge.description}/>
        )}
        {!selectedChallenge && (

          <MotivationComponent/>
        )}
      </div>
    </main>
  );
};

export default MainContent;