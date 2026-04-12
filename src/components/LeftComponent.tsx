import { UserProfile } from "../types/UserProfile";
import ChallengesGrid from "./ChallengesGrid";

export const LeftComponent = ({ user }: { user: UserProfile | null }) => {
  // Your data stays here (or comes from a custom hook later)
  const challengeContent = [
    { name: "Public Speaking" },
    { name: "Cold Outreach" },
    { name: "Networking Event" },
    { name: "Live Coding" },
    { name: "Skydiving" },
    { name: "Deep Sea Diving" }
  ];

  return (
    <section style={{ 
      flex: '0 0 70%', 
      height: '100%', 
      overflowY: 'auto', 
      padding: '32px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '40px', 
        borderRadius: '24px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)', 
        minHeight: '85vh',
        border: '1px solid #f1f5f9'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          Workspace
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Welcome back, <span style={{ color: '#6366f1', fontWeight: '600' }}>{user?.full_name || 'Supraja'}</span>
        </p>

        {/* --- Using the new Grid Component --- */}
        <ChallengesGrid challenges={challengeContent} />
        
      </div>
    </section>
  );
};