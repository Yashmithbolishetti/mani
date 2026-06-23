import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parse middleware
app.use(express.json());

// Prepare database path
const DATA_DIR = path.join(process.cwd(), "src", "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// Ensure data directory and leads file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
}

// Helper to read leads database
function readLeads() {
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading leads file:", err);
    return [];
  }
}

// Helper to write leads database
function writeLeads(leads: any) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing leads file:", err);
    return false;
  }
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Submit Saree Lead Form
app.post("/api/leads", (req, res) => {
  const { fullName, mobile, email, locality, city, interestedIn, budget, message } = req.body;

  if (!fullName || !mobile) {
    return res.status(400).json({ error: "Full Name and Mobile Number are required." });
  }

  const leads = readLeads();
  const newLead = {
    id: `lead_${Date.now()}`,
    fullName,
    mobile,
    email: email || "N/A",
    locality: locality || "N/A",
    city: city || "N/A",
    interestedIn: interestedIn || "General Collection",
    budget: budget || "Not specified",
    message: message || "",
    timestamp: new Date().toISOString(),
  };

  leads.push(newLead);
  writeLeads(leads);

  res.status(201).json({
    success: true,
    message: "Your premium custom design inquiry has been recorded successfully!",
    lead: newLead,
  });
});

// 2. Read Saree Leads (Admin Panel)
app.get("/api/leads", (req, res) => {
  // Simple administrative authorization check from query headers or query params
  const password = req.query.pwd;
  if (password !== "mani2026") {
    return res.status(401).json({ error: "Unauthorized access: Invalid key." });
  }
  const leads = readLeads();
  res.json({ success: true, leads });
});

// 3. Clear Leads (Admin Action)
app.post("/api/leads/clear", (req, res) => {
  const password = req.body.pwd;
  if (password !== "mani2026") {
    return res.status(401).json({ error: "Unauthorized access." });
  }
  writeLeads([]);
  res.json({ success: true, message: "Database cleared successfully." });
});

// 4. Secure Server-Side Gemini Designer Recommendations
app.post("/api/recommendations", async (req, res) => {
  const { fullName, interestedIn, budget, message, stylePreferences } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: "User name is required for recommendations." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API key is not configured inside the server environment. Please make sure to add it.",
      });
    }

    // Initialize Server-Side GoogleGenAI Client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const userPrompt = `
      You are the Elite Lead Designer at "Manifashions Designer Studio" in Mancherial, Telangana.
      A customer named "${fullName}" is looking for dynamic personalized recommendations. Provide an ultra-premium, fashion-insider styling worksheet written in direct, elegant, hospitable fashion language.
      
      Customer Preferences:
      - Saree Category: ${interestedIn}
      - Budget Range: ${budget}
      - Custom Message / Body Type / Styling request: ${message || "Wants elegant custom design suggestions."}
      - Optional Preferences: ${stylePreferences || "Prefers boutique luxury style"}
      
      Please structure your recommendations exactly like a royal customized styling sheet from Sabyasachi or Pernia's Pop-up shop, using the following sections:
      
      1. ✨ THE VISION: A summary of the majestic mood, styling story, and statement theme curated for them.
      2. 🧵 SELECTED TEXTILES & PALETTE: Suggest specific luxurious fabrics (such as Organza, Banarasi Kora, Tussar Silk, French Lace) and elegant color combinations that fits the colors of Manifashions (deep emerald green, rose gold accents, champagne border, ivory drapes).
      3. 🪞 BLOUSE DESIGN & PATTERN: Bespoke recommendations for their necklines, sleeves (e.g., puff organza, heavy zari boarders, high neck royal collar), and handcrafted embroidery motifs.
      4. 💎 ACCESSORIZING ARCHITECTURE: Styling tips including jewelry pairings (e.g., Temple jewelry, premium AD chokers, uncut diamonds), hairstyle, drape style (e.g., traditional seedha pallu or modern infinity cowl drapes), and footwear.
      
      Tone: Graceful, warm, fashion-forward, professional, luxury boutique expert. Avoid generic responses, and keep the recommendations descriptive yet concise (around 250-320 words).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
    });

    const recommendationText = response.text || "Our lead studio designers will be styling your dream saree soon!";
    res.json({ success: true, recommendation: recommendationText });
  } catch (error: any) {
    console.error("Gemini Recommendations Error:", error);
    res.status(500).json({
      error: "Our styling engine is busy reflecting your luxury layout. Our designer team will email or text you directly!",
      detail: error.message,
    });
  }
});

// ----------------------------------------------------
// DEV / PROD HOSTING
// ----------------------------------------------------

async function start() {
  if (process.env.NODE_ENV !== "production") {
    // Development server with Vite integration
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);
    
    console.log("Starting in DEVELOPMENT mode with Vite Middleware.");
  } else {
    // Production build file server
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    
    console.log("Starting in PRODUCTION mode. Serving pre-compiled bundles.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Manifashions Saree Studio Server is live at http://0.0.0.0:${PORT}`);
  });
}

start();
