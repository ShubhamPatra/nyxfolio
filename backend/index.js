const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const chatRoute = require("./routes/chat");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API route
app.use("/chat", chatRoute);

// 👉 Serve static files from CRA build
app.use(express.static(path.join(__dirname, "frontend", "build")));

// 👉 Fallback for React Router (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
