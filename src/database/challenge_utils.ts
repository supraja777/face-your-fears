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

        if (error) console.log("Error while fecthing challenge ", error);

        console.log(`📂 Fetched ${challenges.length} challenges.`);
        return challenges;
    } catch (error) {
        console.error("❌ Error fetching challenges:", error);
        throw error;
    }
}

// Using a standard async fetch or DB client (like Supabase)
export const getChallengeData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('user_id', userId); // Filters rows where user_id matches

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching challenge data:", error);
    return [];
  }
};

export const uploadToCloudinary = async (base64Image: string): Promise<string | null> => {
  const cloudName = CLOUD_NAME; // Replace with your Cloud Name
  const uploadPreset = PRESET_NAME; // Replace with your Unsigned Preset

  try {
    // Cloudinary expects the full Data URI (with the 'data:image/jpeg;base64,' prefix)
    const formData = new FormData();
    formData.append('file', base64Image);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Cloudinary upload failed');
    }

    const data = await response.json();
    return data.secure_url; // This is the short URL (e.g. https://res.cloudinary.com/...)
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
};

export const addPhotoToChallenge = async (challengeId, newPhotoUrl, reflectionNotes) => {
  console.log("Adding photo to dbbbbbbbbbbbbbbbbbb ", challengeId, newPhotoUrl)
  try {
    // 1. Fetch current photos first (if your DB doesn't support atomic append)
    const { data: challenge } = await supabase
      .from('challenges')
      .select('photos')
      .eq('id', challengeId)
      .single();

    const updatedPhotos = [...(challenge.photos || []), {
      url: newPhotoUrl,
    }];

    // 2. Update the record
    const { error } = await supabase
      .from('challenges')
      .update({ 
        photos: updatedPhotos,
        streak: challenge.streak + 1, // Usually you increment streak here to
      })
      .eq('id', challengeId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error appending photo:", error);
    return false;
  }
};