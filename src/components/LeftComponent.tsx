import { UserProfile } from "../types/UserProfile";
import ChallengesGrid from "./ChallengesGrid";

export const LeftComponent = ({ user }: { user: UserProfile | null }) => {
  const challengeContent = [
    { name: "Public Speaking", "streak": 150 },
    { name: "Cold Outreach", "streak": 150 },
    { name: "Networking Event", "streak": 150 },
    { name: "Live Coding", "streak": 150 },
    { name: "Skydiving", "streak": 150 },
    { name: "Deep Sea Diving", "streak": 150 },
    { name: "Heights", "streak": 150 },
    { name: "Spiders", "streak": 150 }
  ];

  return (
    <section style={{ 
      flex: '0 0 70%', 
      height: 'calc(100vh - 70px)', // Subtracting Nav height (70px)
      padding: '32px',
      boxSizing: 'border-box',
      overflow: 'hidden' // Keeps the section itself from growing
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '40px', 
        borderRadius: '24px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)', 
        height: '100%', // Fills the restricted section height
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* Header - Stays static */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Workspace
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '8px' }}>
            Welcome back, <span style={{ color: '#6366f1', fontWeight: '600' }}>{user?.full_name || 'Supraja'}</span>
          </p>
        </div>

        {/* --- SCROLLABLE AREA --- */}
        <div style={{ 
          flex: 1,           // Takes all remaining space in the white card
          overflowY: 'auto', // Enables the scrollbar here
          paddingRight: '15px', 
          marginRight: '-15px', // Offsets padding to keep layout centered
          scrollbarWidth: 'thin'
        }}>
          <ChallengesGrid challenges={challengeContent} />
        </div>
        
      </div>
    </section>
  );
};