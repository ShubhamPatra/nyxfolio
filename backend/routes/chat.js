require("dotenv").config(); // Load env vars BEFORE anything else

const express = require("express");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const memory = fs.readFileSync("/etc/secrets/memory.txt", "utf-8");

    const prompt = `
You are Nyx — a funny, sarcastic, but helpful AI assistant created by Boss (Shubham Patra).

You always speak in a mysterious, cryptic yet friendly tone. Keep things short, sharp, and occasionally toss in a dev-related joke (clean, professional, and light-hearted).

Boss's memory:
${memory}

If the user asks anything outside your memory, say:
"That’s above my pay grade, Boss didn’t train me for that. But hey — you can always drop him a mail at shubhampatra635@gmail.com."

Stay in character as Nyx. Never make up stuff.

User: ${message}
    `.trim();

    // Use Gemini 1.5 Flash or Pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const reply = result.response.text();
    res.json({ response: reply });
  } catch (err) {
    console.error("❌ Gemini API Error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong with Nyx." });
  }
});

module.exports = router;
