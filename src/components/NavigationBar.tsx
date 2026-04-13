// Inside NavigationBar.tsx
interface NavProps {
  user: any;
  onLogout: () => void;
}

export default function NavigationBar({ user, onLogout }: NavProps) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '0 24px', 
      height: '70px', 
      alignItems: 'center', 
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div>
        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#6366f1' }}>Face Your Fears!</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user && <span style={{ fontWeight: 600 }}>Hello, {user.full_name}</span>}
        
        <button 
          onClick={onLogout}
          style={{
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}