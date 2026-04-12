import { LeftComponent } from "./LeftComponent";
import RightComponent from "./RightComponent";

// --- Right Component (30%) ---

interface MainContentProps {
  user: UserProfile | null;
}

const MainContent = ({ user }: MainContentProps) => {
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
      <LeftComponent user={user} />
      <RightComponent />
    </main>
  );
};

export default MainContent;