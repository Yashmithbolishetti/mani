import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "db.json");

app.use(express.json());

// Initialize database with premium seed data if empty
function initDb() {
  const defaultDb = {
    appointments: [
      {
        id: "appt_1",
        fullName: "Anjali Sharma",
        mobileNumber: "919876543210",
        email: "anjali@gmail.com",
        preferredDate: "2026-06-28",
        preferredTime: "11:30",
        serviceRequired: "Bridal Makeup",
        beautyConcern: "Dullness, hydration before big day",
        specialRequests: "Needs traditional Telugu bridal style with jasmine hair styling.",
        status: "Confirmed",
        createdAt: new Date().toISOString()
      },
      {
        id: "appt_2",
        fullName: "Priya Patel",
        mobileNumber: "916305423546",
        email: "priya.patel@outlook.com",
        preferredDate: "2026-06-30",
        preferredTime: "14:00",
        serviceRequired: "Hydra Facial",
        beautyConcern: "Acne scars and hyperpigmentation",
        specialRequests: "First time trying a premium facial.",
        status: "Pending",
        createdAt: new Date().toISOString()
      }
    ],
    beforeAfter: [
      {
        id: "ba_1",
        beforeUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=600",
        afterUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
        serviceName: "Bridal Glow Makeup",
        description: "Elegant airbrush makeup bridal transformation with gold accents.",
        createdAt: new Date().toISOString()
      },
      {
        id: "ba_2",
        beforeUrl: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=600",
        afterUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
        serviceName: "Keratin Smooth Treatment",
        description: "Rejuvenating dull, frizzy curls into high-shine premium silk finish.",
        createdAt: new Date().toISOString()
      }
    ],
    gallery: [
      {
        id: "gal_1",
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
        category: "Hair",
        title: "Vogue Premium Hair Sculpting",
        createdAt: new Date().toISOString()
      },
      {
        id: "gal_2",
        imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
        category: "Treatments",
        title: "Intense Gold Hydra Facial Spa",
        createdAt: new Date().toISOString()
      },
      {
        id: "gal_3",
        imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
        category: "Makeup",
        title: "High-Fashion Editorial Session",
        createdAt: new Date().toISOString()
      },
      {
        id: "gal_4",
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
        category: "Customers",
        title: "Radiant Golden Hour Glow",
        createdAt: new Date().toISOString()
      },
      {
        id: "gal_5",
        imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
        category: "Interior",
        title: "Private Bridal Dressing Suite",
        createdAt: new Date().toISOString()
      }
    ],
    chats: [] as any[]
  };

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), "utf-8");
  } else {
    try {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      JSON.parse(content);
    } catch (e) {
      // Re-write if file corrupted
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), "utf-8");
    }
  }
}

initDb();

function getDb() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function writeDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Lazy init Gemini client to protect against startup crashes if API key is not present
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// --- API ROUTES ---

// GET: Server Status & Config
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// GET & POST: Appointments (Bookings / Leads)
app.get("/api/appointments", (req, res) => {
  const dbData = getDb();
  res.json(dbData.appointments || []);
});

app.post("/api/appointments", (req, res) => {
  const {
    fullName,
    mobileNumber,
    email,
    preferredDate,
    preferredTime,
    serviceRequired,
    beautyConcern,
    specialRequests,
  } = req.body;

  if (!fullName || !mobileNumber || !preferredDate || !preferredTime || !serviceRequired) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const dbData = getDb();
  const newAppointment = {
    id: "appt_" + Date.now(),
    fullName,
    mobileNumber,
    email: email || "",
    preferredDate,
    preferredTime,
    serviceRequired,
    beautyConcern: beautyConcern || "None",
    specialRequests: specialRequests || "None",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  dbData.appointments.unshift(newAppointment);
  writeDb(dbData);

  // SIMULATE REAL-TIME MULTI-CHANNEL NOTIFICATIONS:
  // 1. WhatsApp Notification: Trigger link detail generator
  const whatsappUrl = `https://wa.me/916305423546?text=${encodeURIComponent(
    `✨ *DREAMS BEAUTY CARE* ✨\n\nNew Appointment Booking Request!\n\n👤 *Client:* ${fullName}\n📞 *Phone:* ${mobileNumber}\n📅 *Date:* ${preferredDate}\n⏰ *Time:* ${preferredTime}\n💇‍♀️ *Service:* ${serviceRequired}\n💅 *Concern:* ${beautyConcern || "None"}\n📝 *Requests:* ${specialRequests || "None"}\n\n_Please confirm the slot in the Admin Panel!_`
  )}`;

  res.status(201).json({
    success: true,
    message: "Appointment created successfully!",
    appointment: newAppointment,
    whatsappNotificationUrl: whatsappUrl,
    simulatedEmailAlert: {
      sentToOwner: true,
      ownerEmail: "owner@dreamsbeautycare.com",
      subject: `[New Appointment] Dreams Beauty Care: ${fullName} - ${serviceRequired}`,
    },
  });
});

// PATCH: Update Appointment Status
app.patch("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  const dbData = getDb();
  const index = dbData.appointments.findIndex((a: any) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Appointment not found." });
  }

  dbData.appointments[index].status = status;
  writeDb(dbData);

  res.json({
    success: true,
    appointment: dbData.appointments[index],
  });
});

// DELETE: Delete Appointment
app.delete("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const dbData = getDb();
  const filtered = dbData.appointments.filter((a: any) => a.id !== id);
  dbData.appointments = filtered;
  writeDb(dbData);
  res.json({ success: true, message: "Appointment deleted." });
});

// GET & POST: Before/After Transformations
app.get("/api/before-after", (req, res) => {
  const dbData = getDb();
  res.json(dbData.beforeAfter || []);
});

app.post("/api/before-after", (req, res) => {
  const { beforeUrl, afterUrl, serviceName, description } = req.body;

  if (!beforeUrl || !afterUrl || !serviceName) {
    return res.status(400).json({ error: "Before URL, After URL, and Service Name are required." });
  }

  const dbData = getDb();
  const newItem = {
    id: "ba_" + Date.now(),
    beforeUrl,
    afterUrl,
    serviceName,
    description: description || "",
    createdAt: new Date().toISOString(),
  };

  dbData.beforeAfter.unshift(newItem);
  writeDb(dbData);

  res.status(201).json({ success: true, item: newItem });
});

// DELETE: Before/After item
app.delete("/api/before-after/:id", (req, res) => {
  const { id } = req.params;
  const dbData = getDb();
  dbData.beforeAfter = dbData.beforeAfter.filter((item: any) => item.id !== id);
  writeDb(dbData);
  res.json({ success: true });
});

// GET & POST: Gallery Items
app.get("/api/gallery", (req, res) => {
  const dbData = getDb();
  res.json(dbData.gallery || []);
});

app.post("/api/gallery", (req, res) => {
  const { imageUrl, category, title } = req.body;

  if (!imageUrl || !category || !title) {
    return res.status(400).json({ error: "Image URL, category, and title are required." });
  }

  const dbData = getDb();
  const newItem = {
    id: "gal_" + Date.now(),
    imageUrl,
    category,
    title,
    createdAt: new Date().toISOString(),
  };

  dbData.gallery.unshift(newItem);
  writeDb(dbData);

  res.status(201).json({ success: true, item: newItem });
});

// DELETE: Gallery Item
app.delete("/api/gallery/:id", (req, res) => {
  const { id } = req.params;
  const dbData = getDb();
  dbData.gallery = dbData.gallery.filter((g: any) => g.id !== id);
  writeDb(dbData);
  res.json({ success: true });
});

// POST: AI Chat Assistant (with server-side Gemini 3.5 Flash)
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemPrompt = `You are "Aura", the elegant AI Beauty & Bridal Consultant for "Dreams Beauty Care", located above Laxmi Ganapathi Jewellers on Market Road, Mancherial, Telangana. 

Your persona is:
- High-society, luxury-focused, warm, hospitable, and impeccably professional (like an international beauty director).
- Speak with confidence, luxury aesthetics, and graceful hospitality. Use phrases like "Welcome to the world of Dreams, darling," "magnificent," "indulge," "bespoke."
- When giving recommendations, describe treatments with poetic sensory language (e.g., describing Hydra Facial as "infusing your skin with layers of pure cellular hydration, leaving you with an ethereal, morning-dew radiance").

Key information to ground your answers:
- Services: Hair styling, Hair Spa, Keratin smooth treatments, Hydra Facial, luxury skin whitening facials, Bridal Makeup (specialists in South Indian & traditional Telangana bridal transformations), Party makeup, customized Pre-Bridal packages, professional nail art, manicures, pedicures.
- Address: Beside Archana Tex, Market Rd, above Laxmi Ganapathi Jewellers, Mancherial, Telangana 504208
- Phone & Bookings: 063054 23546
- Hours: Open Daily, Closes at 10 PM. Note: Ashura or festivals might affect these hours.
- Guide guests to book appointments using the "Book Appointment" form directly on the page, or clicking the floating WhatsApp buttons. Mention that our experts provide free customized skincare and hair consultations prior to any premium treatment.

Format your response in beautifully readable Markdown. Add headers, lists, and bold key services to make reading luxurious. Limit responses to 2-3 brief, highly tailored paragraphs. Ensure you always prompt them gently to finalize their reservation!`;

  try {
    const ai = getAiClient();

    if (!ai) {
      // Fallback response generator if GEMINI_API_KEY is not configured
      const fallbackResponse = generateFallbackAiResponse(message);
      return res.json({ text: fallbackResponse });
    }

    // Format history for @google/genai format
    const chatSession = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    // Send history first if present
    if (history && Array.isArray(history) && history.length > 0) {
      // We can restore context by setting messages or passing them.
      // For simplicity, we can also pass them as a list of contents or run chat.sendMessage
      // To keep it clean and robust, we can bundle the conversation history inside a single prompt context or run sequentially.
      // Let's pass the conversation history in the user prompt directly to ensure the chat context is fully respected in a single call.
    }

    // Single prompt combining history for absolute reliability
    const formattedPrompt = history && history.length > 0
      ? `Conversation History:\n${history.map((m: any) => `${m.role === 'user' ? 'Guest' : 'Consultant Aura'}: ${m.text}`).join('\n')}\n\nGuest's New Message: ${message}\n\nPlease respond elegantly as Aura:`
      : message;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedPrompt,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const replyText = response.text || "I am here to guide your beauty journey, darling. How else may I assist you?";

    // Save interaction log to Db for leads visibility
    try {
      const dbData = getDb();
      if (!dbData.chats) dbData.chats = [];
      dbData.chats.push({
        id: "chat_" + Date.now(),
        message,
        reply: replyText,
        createdAt: new Date().toISOString()
      });
      writeDb(dbData);
    } catch (e) {
      // ignore log error
    }

    res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Graceful fallback so UI never fails
    const fallbackResponse = generateFallbackAiResponse(message);
    res.json({ text: fallbackResponse, error: error?.message || "Internal server error" });
  }
});

// GET: Chat logs for owner
app.get("/api/chats-log", (req, res) => {
  const dbData = getDb();
  res.json(dbData.chats || []);
});

// Fallback rule-based beauty assistant response
function generateFallbackAiResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes("hair") || msg.includes("cut") || msg.includes("style") || msg.includes("color")) {
    return `### ✨ Beautiful Choice, Darling!

For your hair, we recommend our signature **Keratin Silk Treatment** or our premium **Vogue Hair Spa**, perfect for restoring lush volume, deep nourishment, and a high-end glossy shine.

Our expert stylists in Mancherial specialize in customized haircuts and high-fashion coloring that perfectly frame your features.

**Next Steps:**
1. Use our **Online Booking Form** to reserve a time.
2. Or, click the floating **WhatsApp** icon to discuss your hair aspirations with an expert!`;
  }
  
  if (msg.includes("bridal") || msg.includes("marriage") || msg.includes("wedding") || msg.includes("makeup")) {
    return `### 👰 Dreams Bridal Beauty Transformation

Welcome to the ultimate bridal journey, darling! At *Dreams Beauty Care*, our certified bridal specialists craft magnificent traditional Telugu and contemporary modern bridal looks.

Our luxury bridal makeup package includes:
- **Flawless Premium HD / Airbrush Makeup**
- **Saree Draping & Traditional Jewel Settings**
- **Bespoke Hair Design with Fresh Jasmine Flowers**
- **Pre-Bridal Golden Glow Skincare Rituals**

We would love to host you for a private bridal consultation. Please fill out our appointment form or contact our owner directly at **063054 23546** to customize your look.`;
  }

  if (msg.includes("skin") || msg.includes("facial") || msg.includes("glow") || msg.includes("hydra")) {
    return `### ✨ Ethereal Radiant Skincare

Indulge your skin with our world-class **Intense Gold Hydra Facial**. This ultra-luxurious treatment deeply cleanses, exfoliates, and infuses your skin with premium serums, leaving you with an instant morning-dew radiance.

We also offer customized fruit facials, organic peel-offs, and skin-brightening treatments to address all skincare concerns.

Please complete the booking form with your skincare concern, and our expert aesthetician will guide your journey.`;
  }

  return `### ✨ Welcome to Dreams Beauty Care, Darling

I am **Aura**, your virtual beauty consultant. Our boutique salon above Laxmi Ganapathi Jewellers in Mancherial is designed to make beauty unforgettable.

How can I pamper you today?
- 💇‍♀️ **Premium Hair Treatments** (Keratin, Hair Spa, Smoothening)
- 💆‍♀️ **Aesthetic Skincare & Facials** (Hydra Facial, Glow Therapy)
- 👰 **Bespoke Bridal Makeovers** (Specialized traditional Telugu bridal care)
- 💅 **Nail Art, Manicures & Pedicures**

Please fill in our **Online Appointment Form** to schedule your luxurious retreat, or ask me any question about our premium treatments!`;
}

// Vite integration for development vs production
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
    console.log(`[Dreams Beauty Care] Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
