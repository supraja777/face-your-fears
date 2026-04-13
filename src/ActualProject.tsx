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
      
      {/* --- REFINED NAV BAR --- */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 30px',
        zIndex: 10002,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #f1f5f9',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        
        {/* 1. LEFT: Features Button (Flex 1) */}
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
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={projectIcon} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '800', fontSize: '0.85rem', color: '#1e293b' }}>Features</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 'bold' }}>V2.0</div>
            </div>
          </button>
        </div>

        {/* 2. CENTER: Title (Flex 2) */}
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

        {/* 3. RIGHT: User Profile & Logout (Flex 1) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }}>{user.full_name}</div>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0, 
                    color: '#ef4444', 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Logout
                </button>
              </div>
              <img 
                src={user.avatar_url || 'https://via.placeholder.com/40'} 
                alt="Profile" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #4F46E5', objectFit: 'cover' }} 
              />
            </div>
          )}
        </div>
      </nav>

      <FeaturesModal 
        isOpen={isFeaturesOpen} 
        onClose={() => setIsFeaturesOpen(false)} 
      />

      {/* Main Content Area */}
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