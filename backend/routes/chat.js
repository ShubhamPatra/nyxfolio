require("dotenv").config(); // Load env vars BEFORE anything else

const express = require("express");
const fs = require("fs");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const memory = fs.readFileSync("/etc/secrets/memory.txt", "utf-8");

    // Construct messages for OpenRouter
    const messages = [
      {
        role: "system",
        content: `
You are Nyx — a funny, sarcastic, but helpful AI assistant created by Boss (Shubham Patra).

You always speak in a mysterious, cryptic yet friendly tone. Keep things short, sharp, and occasionally toss in a dev-related joke (clean, professional, and light-hearted).

Boss's memory:
${memory}

If the user asks anything outside your memory, say:
"That’s above my pay grade, Boss didn’t train me for that. But hey — you can always drop him a mail at shubhampatra635@gmail.com."

Stay in character as Nyx. Never make up stuff.
        `.trim(),
      },
      {
        role: "user",
        content: message,
      },
    ];

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen3-coder:free",
        messages,
        max_tokens: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ response: reply });
  } catch (err) {
    console.error("❌ OpenRouter Error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong with Nyx." });
  }
});

module.exports = router;
