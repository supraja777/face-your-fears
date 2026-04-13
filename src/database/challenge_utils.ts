import { supabase } from './supabase'; // Import the client you just fixed

interface ChallengeData {
    user_id: string;               
    challenge_description: string; 
    streak?: number;
    photos?: string[];             
    tags?: string[];               
    challenge_points?: number;
}

/**
 * Inserts a new challenge entry into Supabase.
 */
export async function createChallenge(data: ChallengeData) {
    try {
        const { data: result, error } = await supabase
            .from('challenges')
            .insert([
                {
                    user_id: data.user_id,
                    challenge_description: data.challenge_description,
                    streak: data.streak ?? 0,
                    photos: data.photos ?? [],
                    tags: data.tags ?? [],
                    challenge_points: data.challenge_points ?? 0
                }
            ])
            .select();

        if (error) throw error;

        console.log(`✅ Challenge added successfully!`);
        return result[0];
    } catch (error) {
        console.error("❌ Error adding challenge:", error);
        throw error;
    }
}

/**
 * Retrieves all challenges associated with a specific User ID.
 */
export async function getChallengesByUserId(userId: string) {
    console.log("In get challenge by User Id", userId)
    if (!userId) {
        console.error("User ID is missing");
        return [];
    }

    try {
        const { data: challenges, error } = await supabase
            .from('challenges')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        console.log(`📂 Fetched ${challenges.length} challenges.`);
        return challenges;
    } catch (error) {
        console.error("❌ Error fetching challenges:", error);
        throw error;
    }
}