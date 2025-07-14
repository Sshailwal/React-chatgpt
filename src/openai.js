import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Vite env variable
const ai = new GoogleGenAI({ apiKey });

export async function fetchGeminiResponse(prompt) { 
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  // The response structure may vary; adjust as needed
  return result.response.text();
}
