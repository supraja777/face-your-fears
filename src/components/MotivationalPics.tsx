import { useState, useEffect } from 'react';
import Auth from './Auth';
import App from './App';
import FeaturesModal from './components/FeaturesModal';
import projectIcon from './assets/image.png'; 

export default function ActualProject() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user", e);
        localStorage.removeItem('app_user');
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('app_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('app_user');
    setUser(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      height: '100vh', 
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      backgroundColor: '#f8fafc',
      overflow: 'hidden'
    }}>
      
      {/* --- TOP NAVIGATION BAR --- */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        zIndex: 10002,
        // Using background color to match your screenshot's clean look
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #f1f5f9'
      }}>
        
        {/* 1. LEFT SECTION (Features Button) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <button 
            onClick={() => setIsFeaturesOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 16px 6px 6px',
              borderRadius: '100px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
            }}
          >
            {/* Logo Thumbnail */}
            <div style={{ 
              width: '34px', 
              height: '34px', 
              borderRadius: '50%', 
              overflow: 'hidden',
              backgroundColor: '#f1f5f9',
              border: '1px solid #f1f5f9'
            }}>
              <img 
                src={projectIcon} 
                alt="Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Label */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#1e293b', lineHeight: 1 }}>
                Features
              </div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 'bold', marginTop: '2px' }}>
                V2.0
              </div>
            </div>
          </button>
        </div>

        {/* 2. CENTER SECTION (Centered Title) */}
        <div style={{ 
          flex: 2, 
          textAlign: 'center'
        }}>
          <h1 style={{ 
            margin: 0, 
            fontWeight: '900', 
            fontSize: '1.6rem', 
            color: '#4F46E5',
            letterSpacing: '-0.03em' 
          }}>
            Face Your Fears! 🚀
          </h1>
        </div>

        {/* 3. RIGHT SECTION (Spacer or Profile) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {/* If you add a logout or profile button later, it goes here */}
        </div>
      </nav>

      {/* --- THE FEATURES MODAL --- */}
      <FeaturesModal 
        isOpen={isFeaturesOpen} 
        onClose={() => setIsFeaturesOpen(false)} 
      />

      {/* --- VIEW ROUTER --- */}
      <div style={{ marginTop: '80px', height: 'calc(100vh - 80px)' }}>
        {user ? (
          <App user={user} onLogout={handleLogout} />
        ) : (
          <Auth onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
      
    </div>
  );
}