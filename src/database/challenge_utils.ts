import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.SUPABASE_DB_URL;

if (!dbUrl) {
    console.error("❌ SUPABASE_DB_URL is missing in .env file");
    process.exit(1);
}

const sql = postgres(dbUrl, { ssl: 'require' });

interface ChallengeData {
    user_id: string;               // UUID from profiles table
    challenge_description: string; 
    streak?: number;
    photos?: string[];             // Array of URLs
    tags?: string[];               // List of strings
    challenge_points?: number;
}

export async function getChallengesByUserId(userId: string) {
    if (!userId) {
        throw new Error("User ID is required to fetch challenges.");
    }

    try {
        const challenges = await sql`
            SELECT 
                id,
                challenge_description,
                streak,
                photos,
                tags,
                challenge_points,
                created_at,
                updated_at
            FROM public.challenges
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;

        console.log(`📂 Fetched ${challenges.length} challenges for user: ${userId}`);
        console.log("Challenges ", challenges)
        return challenges;
    } catch (error) {
        console.error("❌ Error fetching challenges:", error);
        throw error;
    }
}

/**
 * Inserts a new challenge entry into the database.
 */
export async function createChallenge(data: ChallengeData) {
    const { 
        user_id, 
        challenge_description, 
        streak = 0, 
        photos = [], 
        tags = [], 
        challenge_points = 0 
    } = data;

    try {
        const result = await sql`
            INSERT INTO public.challenges (
                user_id, 
                challenge_description, 
                streak, 
                photos, 
                tags, 
                challenge_points
            ) VALUES (
                ${user_id}, 
                ${challenge_description}, 
                ${streak}, 
                ${photos}, 
                ${tags}, 
                ${challenge_points}
            )
            RETURNING *
        `;

        console.log(`✅ Challenge added successfully!`);
        console.table({
            id: result[0].id,
            user_id: result[0].user_id,
            points: result[0].challenge_points,
            streak: result[0].streak
        });
        
        return result[0];
    } catch (error) {
        console.error("❌ Error adding challenge:", error);
        throw error;
    }
}

/**
 * Execution block for testing directly
 */
async function runTest() {
    console.log("🚀 Attempting to add a new challenge...");
    
    try {
        // NOTE: Replace this UUID with a valid ID from your public.profiles table
        const testUserId = "4c9e5a57-6fe1-471d-b6bc-8a87af0f58aa"

        await createChallenge({
            user_id: testUserId,
            challenge_description: '100 Days of Code - SDE Preparation',
            streak: 1,
            photos: ['https://example.com/proof.jpg'],
            tags: ['React', 'Java', 'LeetCode'],
            challenge_points: 10
        });
    } catch (err) {
        console.error("Test execution failed.");
    } finally {
        await sql.end();
        console.log("🏁 Database connection closed.");
    }
}

const isMain = process.argv[1]?.includes('challenge_utils.ts') || process.argv[1]?.includes('tsx');

if (isMain) {
    getChallengesByUserId("4c9e5a57-6fe1-471d-b6bc-8a87af0f58aa");
}