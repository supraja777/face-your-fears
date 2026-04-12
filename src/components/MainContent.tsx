import React from 'react';

// --- Types ---
export interface UserProfile {
  username: string;
  full_name: string;
  avatar_url: string;
  curr_score: number;
}

const LeftComponent = ({ user }: { user: UserProfile | null }) => (
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
      
      <div style={{ 
        marginTop: '40px', 
        height: '400px', 
        backgroundColor: '#f8fafc', 
        borderRadius: '20px', 
        border: '2px dashed #e2e8f0',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#94a3b8',
        fontSize: '1.2rem'
      }}>
        Main App Content Area
      </div>
    </div>
  </section>
);

// --- Right Component (30%) ---
const RightComponent = () => {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    "https://images.unsplash.com/photo-1533167649158-6d508895b680?w=400",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400"
  ];

  return (
    <aside style={{ 
      flex: '0 0 30%', 
      height: '100%',
      backgroundColor: '#ffffff', 
      borderLeft: '1px solid #e2e8f0', 
      padding: '32px', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ 
        fontSize: '0.9rem', 
        fontWeight: '700', 
        color: '#475569', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em' 
      }}>
        Motivation
      </h3>
      {images.map((url, i) => (
        <img 
          key={i} 
          src={url} 
          alt="Inspiration" 
          style={{ 
            width: '100%', 
            borderRadius: '16px', 
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }} 
        />
      ))}
    </aside>
  );
};

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