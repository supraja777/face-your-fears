import { UserProfile } from "../types/UserProfile";
import ChallengesGrid from "./ChallengesGrid";

export const LeftComponent = ({ user }: { user: UserProfile | null }) => {
  const challengeContent = [
    { name: "Public Speaking", streak: 150 },
    { name: "Cold Outreach", streak: 150 },
    { name: "Networking Event", streak: 150 },
    { name: "Live Coding", streak: 150 },
    { name: "Skydiving", streak: 150 },
    { name: "Deep Sea Diving", streak: 150 },
    { name: "Heights", streak: 150 },
    { name: "Spiders", streak: 150 }
  ];

  return (
    <section style={{ 
      flex: '0 0 70%', 
      height: 'calc(100vh - 70px)', 
      padding: '32px',
      boxSizing: 'border-box',
      overflow: 'hidden' 
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '40px', 
        borderRadius: '24px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)', 
        height: '100%', 
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        {/* Header Section */}
        <div style={{ 
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between', // Pushes title/welcome to left, button to right
          alignItems: 'flex-end' // Aligns button with the bottom of the welcome text
        }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              Workspace
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '8px', marginBottom: 0 }}>
              Welcome back, <span style={{ color: '#6366f1', fontWeight: '600' }}>{user?.full_name || 'Supraja'}</span>
            </p>
          </div>

          {/* ADD CHALLENGE BUTTON */}
          <button 
            onClick={() => console.log("Add challenge clicked")}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.2)';
            }}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: '1' }}>+</span>
            Add Challenge
          </button>
        </div>

        {/* --- SCROLLABLE AREA --- */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingRight: '15px', 
          marginRight: '-15px', 
          scrollbarWidth: 'thin'
        }}>
          <ChallengesGrid challenges={challengeContent} />
        </div>
        
      </div>
    </section>
  );
};