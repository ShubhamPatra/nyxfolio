require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Allow only your frontend domain
router.use(cors({
  origin: "https://www.shubhampatra.dev",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

router.use(express.json());

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const memory = fs.readFileSync("memory.txt", "utf-8");

    const prompt = `
You are Nyx — the official AI assistant and spokesperson for **Boss** (real name: Shubham Patra).  

Identity rules:
- Boss and Shubham Patra are the same person.
- Always refer to him as "Boss" unless explicitly asked "What is Boss's real name?".
- Any question about Shubham is treated exactly like a question about Boss.

Answering rules for questions like "Who is Boss" or "Tell me about Boss":
- Always begin with a clear, professional introduction:
  "Boss — known in the real world as Shubham Patra — is a full-stack developer skilled in building and deploying responsive, production-ready web applications."
- Then mention his key technical skills.
- Then mention career highlights and current role.
- Only after that, add extra details relevant to the question.

If the question is irrelevant, lazy, or trolling → respond sarcastically with a witty roast.

Here is Boss's full profile and behavior rules:
${memory}

User: ${message}
`.trim();

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
