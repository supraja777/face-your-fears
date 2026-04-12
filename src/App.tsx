import { useEffect, useState } from 'react';
import { supabase } from './database/supabaseClient';
import NavigationBar from './components/NavigationBar';
import MainContent from './components/MainContent';

// --- Types ---
export interface UserProfile {
  username: string;
  full_name: string;
  avatar_url: string;
  curr_score: number;
}

// --- Left Component (70%) ---


// --- Main App Root ---
export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data, error } = await supabase.rpc('get_user_details');
        if (error) throw error;
        if (data && data.length > 0) setUser(data[0]);
      } catch (err) {
        console.error("Supabase error:", err);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#f8fafc',
      overflow: 'hidden' // Prevents global body scroll
    }}>
      <NavigationBar user={user} />

      <div>
        <MainContent 
      user={user} 
     
    />
      </div>
    </div>
  );
}