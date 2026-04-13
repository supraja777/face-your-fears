import { useState, useEffect } from 'react';
import Auth from './Auth';
import App from './App';

export default function ActualProject() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check storage
    const savedUser = localStorage.getItem('app_user');

    console.log("Saveddddddddddddddd user ", savedUser)
    
    // 2. Only set user if the string actually exists and isn't "undefined"
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing user from storage", e);
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

  // --- 3. The Logic Check ---
  
  // Show nothing or a spinner while we check LocalStorage
  if (loading) return <div>Loading...</div>;

  // If user is null OR undefined, ONLY show Auth
  if (!user) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  console.log("Senging user ", user)

  // Only if we reach this point (user exists), show the App
  return <App user={user} onLogout={handleLogout} />;
}