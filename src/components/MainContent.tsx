import { LeftComponent } from "./LeftComponent";

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