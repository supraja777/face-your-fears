import { analyzeEvidenceWithGroq } from "./groq_api_utils";

/**
 * Internal helper to check if the file metadata matches today's date.
 */
const isPhotoToday = (file: File, today: Date): boolean => {
  if (!file) return false;

  const photoDate = new Date(file.lastModified);

  const isSameYear = photoDate.getFullYear() === today.getFullYear();
  const isSameMonth = photoDate.getMonth() === today.getMonth();
  const isSameDay = photoDate.getDate() === today.getDate();

  return isSameYear && isSameMonth && isSameDay;
};

/**
 * Main verification function
 */
export const isValidPhoto = async (imageFile: File, image: string, taskDescription: string) => {
  try {
    const today = new Date();

    // 1. Check the date first (Instant)
    if (!isPhotoToday(imageFile, today)) {
      console.log("Validation failed: Photo was not taken today.");
      return { 
        verified: false, 
        message: "Upload today's photo!" 
      };
    }

    // 2. Check the content (API call)
    const result = await analyzeEvidenceWithGroq(image, taskDescription);
    
    return {
      verified: result.verified, 
      message: result.verified ? "Saving your accomplishment" : "Photo content doesn't match the task."
    };

  } catch (error) {
    console.error("Groq API Error:", error);
    return { 
      verified: false, 
      message: "Something went wrong, try again" 
    };
  }
};