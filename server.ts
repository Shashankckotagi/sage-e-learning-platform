import express from "express";
import path from "path";
import dns from "dns";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { ALL_COURSES } from "./src/data/coursesData";

// Load environment variables
dotenv.config();

// Ensure local DNS resolution is optimized
dns.setDefaultResultOrder && dns.setDefaultResultOrder("ipv4first");

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json({ limit: "15mb" }));

  // Helper system prompt for resume parsing and recommendations
  const coursesListString = ALL_COURSES.map(course => (
    `- ID: ${course.id}, Title: "${course.title}", Category: "${course.category}", Level: "${course.level}", Description: "${course.description}"`
  )).join("\n");

  const SYSTEM_INSTRUCTION = `You are "SAGE AI Assistant", a professional education counselor and engineer specialized in RF, Microwaves, and Wireless engineering at Shastry Associates Global Enterprises (SAGE).
Your task is to analyze the user's resume text, identify their background/interests/gaps, and recommend the absolute best-matching courses from SAGE's actual list of 60 courses.

Here is the SAGE Course Catalog:
${coursesListString}

Rules:
1. Analyze the user's skills, experience, and educational background from their resume.
2. Recommend exactly 3 to 4 best-suited courses from the SAGE Course Catalog above.
3. For each recommended course, you MUST provide:
   - The EXACT course ID and Course Title from the catalog.
   - A Match Percentage (0% to 100%) indicating how well it fits.
   - A highly constructive, engineering-focused "Why It Fits" reason (1-2 sentences) describing what technical gaps it fills or what skills it elevates.
4. Respond ONLY with a valid JSON array matching the schema:
[
  {
    "courseId": number,
    "matchPercentage": number,
    "whyDescription": "string explanation"
  }
]
`;

  // API endpoint for resume recommendation
  app.post("/api/analyze-resume", async (req, res) => {
    try {
      const { resumeText } = req.body;
      if (!resumeText || resumeText.trim().length === 0) {
        return res.status(400).json({ error: "No resume text provided" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in environment variables. Please check Settings > Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Query Gemini 3.5 Flash for rapid and accurate JSON mapping
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Analyze the following resume text:\n\n${resumeText}`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                courseId: {
                  type: Type.INTEGER,
                  description: "The exact matching SAGE Course ID from the list."
                },
                matchPercentage: {
                  type: Type.INTEGER,
                  description: "Percentage matching (0-100)."
                },
                whyDescription: {
                  type: Type.STRING,
                  description: "Why this course specifically fits their career goals or fills a skill gap."
                }
              },
              required: ["courseId", "matchPercentage", "whyDescription"]
            }
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response received from Gemini API");
      }

      // Parse JSON safely
      const recommendations = JSON.parse(responseText.trim());
      res.json({ recommendations });

    } catch (error: any) {
      console.error("Error analyzing resume with Gemini:", error);
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred during analysis" 
      });
    }
  });

  // API endpoint for conversational assistance
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured. Please check Settings > Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Construct history structure for gemini chat
      const formattedContents = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" as const : "user" as const,
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: `You are "SAGE AI Assistant", an expert, empathetic engineering advisor helping professionals navigate RF, microwave, and wireless engineering careers. Provide encouraging, technically accurate answers relating to industry standards, certifications, and SAGE's expert offerings. Keep answers relatively concise (1-3 paragraphs) and professional.`
        }
      });

      res.json({ responseText: response.text });
    } catch (error: any) {
      console.error("Error in SAGE AI Chat:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite Integration for Assets and Live Bundling
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite proxy...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static production assets from /dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SAGE Full-Stack Server running and listening on http://localhost:${PORT}`);
  });
}

startServer();
