import { useState } from 'react';
import { UserProfile } from "../types/UserProfile";
import ChallengesGrid from "./ChallengesGrid";
import CongratulationsModal from "./CongratulationsModal";

export const LeftComponent = ({ user }: { user: UserProfile | null }) => {
  // State to control the LeetCode-style achievement pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - in a real app, this might come from Supabase or a prop
  const challengeContent = [
    { name: "Public Speaking", streak: 15 },
    { name: "Cold Outreach", streak: 7 },
    { name: "Networking Event", streak: 3 },
    { name: "Live Coding", streak: 22 },
    { name: "Skydiving", streak: 1 },
    { name: "Deep Sea Diving", streak: 0 },
    { name: "Heights", streak: 12 },
    { name: "Spiders", streak: 5 }
  ];

  return (
    <section style={{ 
      flex: '0 0 70%', 
      height: 'calc(100vh - 70px)', 
      padding: '32px',
      boxSizing: 'border-box',
      overflow: 'hidden', // Prevents the whole section from shaking
      position: 'relative'
    }}>
      
      {/* 1. The Achievement Modal (Tortoise & Confetti) */}
      <CongratulationsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* 2. Main Workspace Card */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '40px', 
        borderRadius: '32px', 
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)', 
        height: '100%', 
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        
        {/* Header: Title + Welcome + Add Button */}
        <div style={{ 
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '2.2rem', 
              fontWeight: '800', 
              color: '#0f172a', 
              margin: 0,
              letterSpacing: '-0.03em' 
            }}>
              Workspace
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '8px', marginBottom: 0 }}>
              Welcome back, <span style={{ color: '#6366f1', fontWeight: '700' }}>{user?.full_name || 'Supraja'}</span>
            </p>
          </div>

          {/* Add Challenge Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '18px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 20px -4px rgba(99, 102, 241, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(99, 102, 241, 0.4)';
            }}
          >
            <span style={{ fontSize: '1.4rem', lineHeight: '0' }}>+</span>
            Add Challenge
          </button>
        </div>

        {/* 3. Scrollable Grid Content */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingRight: '10px', 
          marginRight: '-10px', // Hides the scrollbar gap while keeping padding
          scrollbarWidth: 'thin',
          msOverflowStyle: 'none'
        }}>
          <ChallengesGrid challenges={challengeContent} />
        </div>
        
      </div>

      {/* Internal Component Styling */}
      <style>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </section>
  );
};