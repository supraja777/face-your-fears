import { useEffect, useState } from 'react';
import { supabase } from './database/supabaseClient';

interface UserProfile {
  username: string;
  full_name: string;
  avatar_url: string;
  curr_score: number;
}

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.rpc('get_user_details');
      if (data && data.length > 0) {
        setUser(data[0]);
      }
    }
    getData();
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* --- FIXED TOP NAV --- */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        fontFamily: 'sans-serif'
      }}>
        {/* Left Side: App Logo/Name */}
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#4F46E5' }}>
          Face Your Fears 🚀
        </div>

        {/* Right Side: User Info */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{user.full_name}</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Score: 
                <span style={{ color: '#059669', fontWeight: 'bold', marginLeft: '4px' }}>
                  {user.curr_score}
                </span>
              </div>
            </div>
            <img 
              src={user.avatar_url} 
              alt="Profile" 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #4F46E5',
                backgroundColor: '#eee'
              }}
            />
          </div>
        ) : (
          <div style={{ fontSize: '0.9rem', color: '#999' }}>Loading...</div>
        )}
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Ready to start?</h2>
        <p>Your dashboard is active.</p>
      </main>
    </div>
  );
}

export default App;