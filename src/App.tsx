import { useEffect, useState } from 'react';
import { supabase } from './database/supabaseClient';
import NavigationBar from './components/NavigationBar';
import MainContent from './components/MainContent';
import { UserProfile } from './types/UserProfile';
import { getUserById, ProfileData } from './database/profile_utils';
import { getChallengesByUserId } from './database/challenge_utils';
import './index.css'; // 👈 Must be at the top!


export default function App({ user, onLogout }: { user: any, onLogout: () => void }) {
 
  const [selectedChallenge, setSelectedChallenge] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const[challenges, setChallenges] = useState([])
  

  const fetchChallenges = async (userId?: string) => {
    
      if (!userId) {
        const savedUser = localStorage.getItem('app_user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          userId = parsedUser.id;
        }
      }
      console.log("Is user id undefined ", userId)
      console.log("In the fetch challenges ", userId)
      if (userId) {
          try {
            setLoading(true);
            const data = await getChallengesByUserId(userId);
            console.log("IN left challenges data is ", data)
            setChallenges(data);
            
            if (selectedChallenge.id) {
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
}, [user]); // Run this whenever the user state changes

  // useEffect(() => {
  //   async function loadData() {
  //     try {
  //       const data = await getUserById();
  //       console.log("User data is ", data)
  //       if (data) setUser(data);

  //       else console.log("Failed to fetch user data")
  //     } catch (err) {
  //       console.error("Supabase error:", err);
  //     }
  //   }
  //   loadData();
  // }, []);

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
      <NavigationBar user={user} />

      {/* FIX: Removed the extra wrapper div. 
          MainContent needs to be a direct child of the 100vh flex container 
          so it can receive "flex: 1".
      */}
      <MainContent challenges = {challenges} fetchChallenges = {fetchChallenges} onRefresh={fetchChallenges} user={user} selectedChallenge={selectedChallenge} setSelectedChallenge = {setSelectedChallenge}/>
    </div>
  );
}