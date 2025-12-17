import { GoogleGenAI, Type } from "@google/genai";
import { ImageSize, Product } from "../types";

// Helper to ensure we have a client. 
// For text generation, we strictly follow the guideline to use process.env.API_KEY
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSneakerImage = async (prompt: string, size: ImageSize): Promise<string> => {
  // Ensure API Key is selected for the high-quality model
  if (window.aistudio && window.aistudio.hasSelectedApiKey && window.aistudio.openSelectKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
  }

  const ai = getAiClient();

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
          imageSize: size
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};

export const analyzeMarketTrends = async (inventoryCategories: string[]): Promise<string> => {
  const ai = getAiClient();
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `As a sneaker market analyst expert, analyze the current trends for a retailer in Kenya with these categories: ${inventoryCategories.join(', ')}. 
    Provide 3 key bullet points on what is trending right now and 1 marketing strategy suggestion. 
    Keep it professional, concise, and focused on sales growth. Use Markdown formatting.`,
  });
  
  return response.text || "Analysis unavailable.";
};

export interface PriceUpdateSuggestion {
  productId: string;
  suggestedPrice: number;
  reasoning: string;
}

export const generateCampaignOffers = async (products: Product[], campaignDescription: string): Promise<PriceUpdateSuggestion[]> => {
  const ai = getAiClient();
  
  // Simplified context to save tokens
  const inventory = products.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category }));

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Create a discount offer list for the following sneaker inventory based on this campaign theme: "${campaignDescription}".
    Inventory: ${JSON.stringify(inventory)}.
    Rules:
    1. Suggest realistic discounts (e.g. 10-30% off) relevant to the campaign (e.g. Christmas, Black Friday).
    2. Provide a short reasoning for each.
    3. Return strictly JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                productId: { type: Type.STRING },
                suggestedPrice: { type: Type.NUMBER },
                reasoning: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  const json = JSON.parse(response.text || "{}");
  return json.suggestions || [];
};