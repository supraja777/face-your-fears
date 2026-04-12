import { useEffect, useState } from 'react';
import { supabase } from './database/supabaseClient';
import NavigationBar from './components/NavigationBar';
import MainContent from './components/MainContent';
import { UserProfile } from './types/UserProfile';


export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(false);

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
      overflow: 'hidden', 
      position: 'fixed',
      top: 0,
      left:0
    }}>
      <NavigationBar user={user} />

      {/* FIX: Removed the extra wrapper div. 
          MainContent needs to be a direct child of the 100vh flex container 
          so it can receive "flex: 1".
      */}
      <MainContent  user={user} selectedChallenge={selectedChallenge} setSelectedChallenge = {setSelectedChallenge}/>
    </div>
  );
}