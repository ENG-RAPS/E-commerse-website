import { GoogleGenAI } from "@google/genai";
import { ImageSize } from "../types";

export const generateSneakerImage = async (prompt: string, size: ImageSize): Promise<string> => {
  // Ensure API Key is selected for the high-quality model
  if (window.aistudio && window.aistudio.hasSelectedApiKey && window.aistudio.openSelectKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Assume success after dialog close, or throw/retry
      }
  }

  // Create client instance JUST BEFORE the call to ensure it picks up the key if it was just selected
  // Note: In a real app, you might handle the "cancel dialog" case more gracefully.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `A professional, high-quality product photography shot of a sneaker. ${prompt}. Clean white background, studio lighting.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size, // '1K', '2K', or '4K'
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};