import React, { useState } from 'react';
import { supabase } from './database/supabase';

interface AuthProps {
  onLoginSuccess: (userData: any) => void;
}

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState(''); // New field
  const [avatarUrl, setAvatarUrl] = useState(''); // New field

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) return alert("Passwords do not match!");
    if (username.length < 3) return alert("Username must be at least 3 characters");
    if (!fullName) return alert("Full Name is required");

    setLoading(true);
    try {
      // Single Insert into the brand new profiles table
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ 
          username, 
          password, 
          full_name: fullName, 
          avatar_url: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` // Default avatar
        }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') throw new Error("Username already taken!");
        throw error;
      }

      alert("Account created successfully!");
      setIsLoginView(true);
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Select everything from profiles where username and password match
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .maybeSingle();

      console.log("what is the data??  ", data)

      if (data) {
        onLoginSuccess(data);
      } else {
        alert("Invalid username or password");
      }
    } catch (err: any) {
      alert("Login failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
          {isLoginView ? "Welcome Back" : "Create Account"}
        </h2>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>
          {isLoginView ? "Log in to track your challenges" : "Start your journey today"}
        </p>

        <form onSubmit={isLoginView ? handleLogin : handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Username is used in both Login and Register */}
          <input 
            required
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={inputStyle}
          />

          {/* Registration-only fields */}
          {!isLoginView && (
            <>
              <input 
                required
                placeholder="Full Name" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                style={inputStyle}
              />
              <input 
                placeholder="Avatar URL (Optional)" 
                value={avatarUrl} 
                onChange={(e) => setAvatarUrl(e.target.value)} 
                style={inputStyle}
              />
            </>
          )}

          <input 
            required
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          
          {!isLoginView && (
            <input 
              required
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
          )}

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Please wait..." : (isLoginView ? "Login" : "Register")}
          </button>
        </form>

        <button 
          onClick={() => setIsLoginView(!isLoginView)} 
          style={{ background: 'none', border: 'none', color: '#6366f1', marginTop: '20px', cursor: 'pointer', fontWeight: 600 }}
        >
          {isLoginView ? "New here? Create account" : "Have an account? Log in"}
        </button>
      </div>
    </div>
  );
}

// --- STYLES ---
const containerStyle: React.CSSProperties = {
  minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif"
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center'
};

const inputStyle = {
  padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none'
};

const btnStyle = {
  padding: '14px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer'
};