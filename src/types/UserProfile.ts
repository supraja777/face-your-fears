export interface UserProfile {
  id: string;          // UUID from Supabase
  username: string;    // 'supraja_dev'
  full_name: string;   // 'Supraja Srikanth'
  avatar_url: string;  // DiceBear SVG URL
  curr_score: number;  // Current game/task score
  chat_history: any[]; // JSONB column (defaults to [])
  updated_at: string;  // ISO Timestamp
  created_at: string;  // ISO Timestamp
}