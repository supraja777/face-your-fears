import { useEffect, useState } from 'react';
import { supabase } from './database/supabaseClient';
import NavigationBar from './components/NavigationBar';
import MainContent from './components/MainContent';
import { UserProfile } from './types/UserProfile';
import { getUserById, ProfileData } from './database/profile_utils';
import { getChallengesByUserId } from './database/challenge_utils';
import './index.css'; 

export default function App({ user, onLogout }: { user: any, onLogout: () => void }) {
  
  const [selectedChallenge, setSelectedChallenge] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    // 1. Clear LocalStorage
    localStorage.removeItem('app_user'); 
    // 2. Call the parent onLogout to reset state
    onLogout(); 
  };

  const fetchChallenges = async (userId?: string) => {
    if (!userId) {
      const savedUser = localStorage.getItem('app_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        userId = parsedUser.id;
      }
    }

    if (userId) {
      try {
        setLoading(true);
        const data = await getChallengesByUserId(userId);
        setChallenges(data);
        
        // Fix: Added check for selectedChallenge?.id to prevent crash
        if (selectedChallenge && selectedChallenge.id) {
          const updatedTarget = data.find(c => c.id === selectedChallenge.id);
          if (updatedTarget) {
            setSelectedChallenge({ ...updatedTarget });
          }
        }
      } catch (error) {
        console.error("Failed to load challenges:", error);
      } finally {
        setLoading(false);
      }
    }
  }; 

  useEffect(() => {
    if (user?.id) {
      fetchChallenges(user.id);
    }
  }, [user]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: '#F0F4FF',
      overflow: 'hidden', 
      position: 'fixed',
      top: 0,
      left:0
    }}>
      {/* Pass handleLogout to your NavigationBar */}
      <NavigationBar user={user} onLogout={handleLogout} />

      <MainContent 
        challenges={challenges} 
        fetchChallenges={fetchChallenges} 
        onRefresh={() => fetchChallenges()} 
        user={user} 
        selectedChallenge={selectedChallenge} 
        setSelectedChallenge={setSelectedChallenge}
      />
    </div>
  );
}