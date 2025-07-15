import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function fetchGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});
  const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
  return result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
