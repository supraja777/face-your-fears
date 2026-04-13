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
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match!");
    if (username.length < 3) return alert("Username must be at least 3 characters");
    if (!fullName) return alert("Full Name is required");

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ 
          username, 
          password, 
          full_name: fullName, 
          avatar_url: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
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
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .maybeSingle();

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
        <div style={headerStyle}>
            <div style={logoBadgeStyle}>✨</div>
            <h2 style={titleStyle}>
              {isLoginView ? "Welcome Back" : "Create Account"}
            </h2>
            <p style={subtitleStyle}>
              {isLoginView ? "Enter your credentials to continue" : "Join the community and start tracking"}
            </p>
        </div>

        <form onSubmit={isLoginView ? handleLogin : handleSignUp} style={formStyle}>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Username</label>
            <input 
              required
              placeholder="johndoe" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={inputStyle}
            />
          </div>

          {!isLoginView && (
            <>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Full Name</label>
                <input 
                  required
                  placeholder="John Doe" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  style={inputStyle}
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Avatar URL</label>
                <input 
                  placeholder="https://..." 
                  value={avatarUrl} 
                  onChange={(e) => setAvatarUrl(e.target.value)} 
                  style={inputStyle}
                />
              </div>
            </>
          )}

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          
          {!isLoginView && (
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Confirm Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            style={{...btnStyle, opacity: loading ? 0.7 : 1}}
          >
            {loading ? (
                <span style={loaderStyle}>Processing...</span>
            ) : (
                isLoginView ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        <div style={footerStyle}>
            <span style={{color: '#64748b'}}>{isLoginView ? "Don't have an account?" : "Already have an account?"}</span>
            <button 
              onClick={() => setIsLoginView(!isLoginView)} 
              style={toggleBtnStyle}
            >
              {isLoginView ? "Sign up" : "Log in"}
            </button>
        </div>
      </div>
    </div>
  );
}

// --- STYLES ---
const containerStyle: React.CSSProperties = {
  minHeight: '100vh', 
  width: '100vw', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: '48px 40px',
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  width: '100%',
  maxWidth: '440px',
  backdropFilter: 'blur(10px)',
};

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '32px'
};

const logoBadgeStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    backgroundColor: '#6366f1',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    margin: '0 auto 16px auto',
    boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)'
};

const titleStyle: React.CSSProperties = {
    fontSize: '1.75rem', 
    fontWeight: 800, 
    color: '#1e293b',
    margin: '0 0 8px 0',
    letterSpacing: '-0.025em'
};

const subtitleStyle: React.CSSProperties = {
    color: '#64748b', 
    fontSize: '0.95rem',
    margin: 0
};

const formStyle: React.CSSProperties = {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px'
};

const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    textAlign: 'left'
};

const labelStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#475569',
    marginLeft: '4px'
};

const inputStyle: React.CSSProperties = {
  padding: '12px 16px', 
  borderRadius: '10px', 
  border: '1px solid #e2e8f0', 
  fontSize: '1rem', 
  outline: 'none',
  transition: 'all 0.2s ease',
  backgroundColor: '#f8fafc'
};

const btnStyle: React.CSSProperties = {
  marginTop: '8px',
  padding: '14px', 
  backgroundColor: '#6366f1', 
  color: 'white', 
  border: 'none', 
  borderRadius: '10px', 
  fontSize: '1rem', 
  fontWeight: 600, 
  cursor: 'pointer',
  transition: 'transform 0.1s ease, background-color 0.2s ease',
  boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
};

const footerStyle: React.CSSProperties = {
    marginTop: '24px',
    fontSize: '0.9rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px'
};

const toggleBtnStyle: React.CSSProperties = {
    background: 'none', 
    border: 'none', 
    color: '#6366f1', 
    cursor: 'pointer', 
    fontWeight: 700,
    padding: 0,
    fontSize: '0.9rem'
};

const loaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
};