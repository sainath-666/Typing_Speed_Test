import { GoogleGenAI } from "@google/genai";

// eslint-disable-next-line no-undef
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const topics = [
  "technology",
  "nature",
  "space",
  "history",
  "art",
  "science",
  "literature",
  "music",
  "sports",
  "food",
  "travel",
  "animals",
  "oceans",
  "mountains",
  "computers",
  "architecture",
  "philosophy",
  "psychology",
  "economics",
  "mythology",
];

const getRandomTopic = () => {
  return topics[Math.floor(Math.random() * topics.length)];
};

export const fetchTypingText = async () => {
  try {
    const topic = getRandomTopic();
    const prompt = `Generate a single paragraph of text about ${topic} for a typing speed test. The text should be suitable for all audiences, consist of common English words, and include basic punctuation like commas and periods. It should not contain any special characters, formatting, or newline characters. Aim for a length between 250 and 350 characters.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 100,
        thinkingConfig: { thinkingBudget: 50 },
      },
    });

    let text = response.text.trim().replace(/\n/g, " ");

    if (!text) {
      throw new Error("Gemini API returned an empty string");
    }

    if (
      (text.startsWith('"') && text.endsWith('"')) ||
      (text.startsWith("'") && text.endsWith("'"))
    ) {
      text = text.substring(1, text.length - 1);
    }

    return text;
  } catch (error) {
    console.error("Error fetching text from Gemini API:", error);
    throw error;
  }
};
