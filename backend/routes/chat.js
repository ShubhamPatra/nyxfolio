require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const router = express.Router();

const memoryFile = "memory.txt";
let lastRoast = "";

router.use(cors({
  origin: [
    "https://www.shubhampatra.dev",
    "https://v1.shubhampatra.dev",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

router.use(express.json());

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    let memory = "";
    if (fs.existsSync(memoryFile)) {
      memory = fs.readFileSync(memoryFile, "utf-8");
    }

    const systemPrompt = `
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
⚠ Never repeat the last roast: "${lastRoast}"

Here is Boss's full profile and behavior rules:
${memory}
`.trim();

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-70b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.9,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://v1.shubhampatra.dev",
          "X-Title": "NyxFolio",
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    // Save last roast in memory only if it looks like a roast/error
    // (This heuristic was in the original code, keeping it for now)
    if (reply && reply.length < 120 && /[0-9]{3}|error|Exception|fault|teapot|roast/i.test(reply)) {
      lastRoast = reply;
    }

    res.json({ response: reply });

  } catch (err) {
    console.error("❌ OpenRouter/Llama API Error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong with Nyx." });
  }
});

module.exports = router;
