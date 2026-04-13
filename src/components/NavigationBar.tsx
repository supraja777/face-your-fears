import { UserProfile } from "../types/UserProfile";

interface NavigationBarProps {
  user: UserProfile | null;
}

const NavigationBar = ({ user }: NavigationBarProps) => {

  return (
    <nav style={{
      height: '70px',
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          borderRadius: '8px' 
        }} />
        <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>
          FEARLESS
        </span>
      </div>

      {/* Stats & Profile Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* Global Streak Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#fff7ed',
          padding: '6px 14px',
          borderRadius: '12px',
          border: '1px solid #ffedd5'
        }}>
          <span style={{ fontSize: '1.1rem' }}>🔥</span>
          <span style={{ 
            fontSize: '0.95rem', 
            fontWeight: '700', 
            color: '#ea580c' 
          }}>
            12 Day Streak
          </span>
        </div>

        {/* Score Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f5f3ff',
          padding: '6px 14px',
          borderRadius: '12px'
        }}>
          <span style={{ color: '#6366f1', fontWeight: '700' }}>
            {user?.curr_score?.toLocaleString() || '0'}
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>
            PTS
          </span>
        </div>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px', borderLeft: '1px solid #f1f5f9' }}>
          <img 
            src={user?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Supraja'} 
            alt="Profile" 
            style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#f1f5f9' }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;