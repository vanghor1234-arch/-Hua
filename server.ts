import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for AI generation
app.post("/api/generate", async (req, res) => {
  try {
    const { systemInstruction, prompt, useSearch } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();
    const model = useSearch ? "gemini-3.5-flash" : "gemini-3.8-flash";
    const config: any = {
      systemInstruction: systemInstruction || "You are a professional luxury real estate AI sales assistant for Borey Mean Chey Residences, communicating in fluent Khmer and professional tone.",
      temperature: 0.7,
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config,
    });

    res.json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// API endpoint for Multi-turn Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { history, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();
    const contents = (history || []).map((h: any) => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: "You are Rose Marvel, an expert AI luxury real estate sales assistant for Borey Mean Chey Residences. You provide professional, persuasive, and courteous advice, market insights, and property recommendations in fluent Khmer and English.",
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to process chat" });
  }
});

// API endpoint for Google Search Grounding Market Insights
app.post("/api/search", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Rose Marvel Market Intelligence Assistant. Provide accurate, up-to-date real estate market intelligence, economic trends, interest rates, and property news in Cambodia using Google Search grounding.",
        tools: [{ googleSearch: {} }],
      },
    });

    res.json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Search Grounding Error:", error);
    res.status(500).json({ error: error.message || "Failed to search" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
