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

  // Motivational images array
  const motivationalPics = [
    "http://googleusercontent.com/image_collection/image_retrieval/9215018691526197991_0",
    "http://googleusercontent.com/image_collection/image_retrieval/9215018691526197991_1",
    "http://googleusercontent.com/image_collection/image_retrieval/9215018691526197991_2",
    "http://googleusercontent.com/image_collection/image_retrieval/9215018691526197991_3",
    "http://googleusercontent.com/image_collection/image_retrieval/9215018691526197991_4"
  ];

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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f3f4f6' 
    }}>
      
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
        zIndex: 1000
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#4F46E5' }}>
          Face Your Fears 🚀
        </div>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{user.full_name}</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                Score: <span style={{ color: '#059669', fontWeight: 'bold' }}>{user.curr_score}</span>
              </div>
            </div>
            <img src={user.avatar_url} alt="Profile" style={{ width: '40px', borderRadius: '50%', border: '2px solid #4F46E5' }} />
          </div>
        )}
      </nav>

      {/* --- MAIN LAYOUT (Content + Sidebar) --- */}
      <div style={{ display: 'flex', flex: 1, marginTop: '70px' }}>
        
        {/* LEFT: MAIN CONTENT (80%) */}
        <main style={{ flex: 0.8, padding: '40px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h1>Welcome back, {user?.full_name.split(' ')[0] || 'User'}!</h1>
            <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>
              Your progress is being tracked. Keep pushing forward!
            </p>
          </div>
        </main>

        {/* RIGHT: MOTIVATION SIDEBAR (20%) */}
        <aside style={{ 
          flex: 0.2, 
          backgroundColor: '#ffffff', 
          borderLeft: '1px solid #e5e7eb',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 70px)'
        }}>
          <h3 style={{ fontSize: '1rem', color: '#374151', textAlign: 'center', marginBottom: '10px' }}>
            Daily Inspiration
          </h3>
          
          {motivationalPics.map((pic, index) => (
            <div key={index} style={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}>
              <img 
                src={pic} 
                alt={`Motivation ${index + 1}`} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} 
              />
            </div>
          ))}
        </aside>

      </div>
    </div>
  );
}

export default App;