/**
 * Utility for Groq Vision API calls.
 * This function takes a base64 image and a task description,
 * then returns a structured validation result.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const analyzeEvidenceWithGroq = async (base64Image: string, taskDescription: string) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // Note: Using the current stable Llama 3.2 Vision model as LLaVA is decommissioned
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are a mission auditor. Analyze the provided image. 
                       Does it prove completion of the task: "${taskDescription}"? 
                       Return ONLY a JSON object with "verified" (boolean) and "reason" (string).`
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Groq API Request Failed");
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0]?.message?.content) {
      return JSON.parse(data.choices[0].message.content);
    } else {
      throw new Error("Unexpected response structure from Groq");
    }
  } catch (error: any) {
    console.error("Groq Analysis Error:", error);
    return {
      verified: false,
      reason: error.message || "An unknown error occurred during verification."
    };
  }
};