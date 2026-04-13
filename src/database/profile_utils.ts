import { supabase } from './supabase';

export interface ProfileData {
    id: string; // UUID represented as a string
    username: string;
    full_name: string;
    avatar_url?: string;
    curr_score?: number;
    chat_history?: any[];
    created_at?: string;
}

/**
 * Fetches the full profile for a specific user ID.
 */
export async function getUserById() {
  
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .single(); // .single() because IDs are unique

        if (error) throw error;

        return data as ProfileData;
    } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        throw error;
    }
}

/**
 * Updates a user's score or profile information.
 */
export async function updateUserProfile(userId: string, updates: Partial<ProfileData>) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select();

        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error("❌ Error updating profile:", error);
        throw error;
    }
}