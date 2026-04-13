import { analyzeEvidenceWithGroq } from "./groq_api_utils";

export const isValidPhoto = async (image: string, taskDescription: string) => {
    try {
      const result = await analyzeEvidenceWithGroq(image, taskDescription);
      return result.verified;
    } catch (error) {
      console.error("Groq API Error:", error);
      return false;
    }
  };