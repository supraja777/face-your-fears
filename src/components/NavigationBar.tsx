import { UserProfile } from '../types'; // Adjust if your interface is elsewhere

interface NavProps {
  user: UserProfile | null;
}

const Nav = ({ user }: NavProps) => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)', // Modern glass effect
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.03)',
      zIndex: 1000,
      fontFamily: '"Inter", system-ui, sans-serif'
    }}>
      {/* Brand / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          F
        </div>
        <span style={{ 
          fontWeight: 700, 
          fontSize: '1.2rem', 
          letterSpacing: '-0.5px',
          color: '#1f2937'
        }}>
          Face Your Fears
        </span>
      </div>

      {/* User Actions / Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {user ? (
          <>
            {/* Score Badge */}
            <div style={{
              backgroundColor: '#f3f4f6',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#4b5563',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ color: '#8b5cf6' }}>★</span>
              <span>{user.curr_score} pts</span>
            </div>

            {/* Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                <div style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 600, 
                  color: '#111827',
                  lineHeight: 1 
                }}>
                  {user.full_name}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  marginTop: '4px' 
                }}>
                  @{user.username}
                </div>
              </div>
              <img 
                src={user.avatar_url} 
                alt="Profile" 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #e5e7eb',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }} 
              />
            </div>
          </>
        ) : (
          <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Connecting...</div>
        )}
      </div>
    </nav>
  );
};

export default Nav;     