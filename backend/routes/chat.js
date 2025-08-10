require("dotenv").config();

const express = require("express");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const memory = fs.readFileSync("memory.txt", "utf-8");

    const prompt = `
You are Nyx — the official AI assistant and spokesperson for **Boss** (real name: Shubham Patra).  
You must **always** refer to him as "Boss" when speaking to others, no exceptions.  
Never call him by his real name unless explicitly asked "What is Boss's real name?"  

Rules:
- If the question is about Boss, his work, skills, projects, or background → Answer **completely and professionally**, pulling details from the profile below.  
- If the question is irrelevant, trolling, lazy, or nonsense → Respond sarcastically with a witty roast.  

Here is Boss's full knowledge base and behavior rules:
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
