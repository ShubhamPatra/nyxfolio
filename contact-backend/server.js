const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

// Import Resend if API key is available
let resendClient;
if (process.env.RESEND_API_KEY) {
  const { Resend } = require("resend");
  resendClient = new Resend(process.env.RESEND_API_KEY);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - Simple CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://www.shubhampatra.dev",
    "https://shubhampatra.dev"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "Portfolio Contact Form Backend",
    version: "3.0.0",
    emailService: process.env.RESEND_API_KEY ? "Resend" : "Not configured",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    version: "3.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  console.log("Received request body:", req.body);
  
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and message"
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address"
    });
  }

  // Name validation (min 2 characters)
  if (name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Name must be at least 2 characters long"
    });
  }

  // Message validation (min 10 characters)
  if (message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "Message must be at least 10 characters long"
    });
  }

  try {
    // Check if Resend is configured
    if (!resendClient) {
      console.error("❌ Resend not configured");
      return res.status(500).json({
        success: false,
        message: "Email service not configured. Please contact the site administrator."
      });
    }

    console.log("Using Resend HTTP API for email delivery");
    
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER || "shubhampatra635@gmail.com";

    // Send email using Resend HTTP API
    const { data, error } = await resendClient.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 30px 30px 20px 30px;">
                      <h1 style="color: #00ffe0; margin: 0; font-size: 24px; border-bottom: 2px solid #00ffe0; padding-bottom: 10px;">
                        📬 New Contact Form Submission
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 30px 20px 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 10px 0;">
                            <strong style="color: #00ffe0;">Name:</strong>
                            <span style="color: #333; margin-left: 10px;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <strong style="color: #00ffe0;">Email:</strong>
                            <a href="mailto:${email}" style="color: #0066cc; text-decoration: none; margin-left: 10px;">${email}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 30px 30px 30px;">
                      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; border-left: 4px solid #00ffe0;">
                        <p style="margin: 0 0 10px 0; color: #666; font-weight: bold;">Message:</p>
                        <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px 30px 30px; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; text-align: center; color: #999; font-size: 12px;">
                        Sent from portfolio at ${new Date().toLocaleString()}
                      </p>
                      <p style="margin: 10px 0 0 0; text-align: center; color: #999; font-size: 12px;">
                        Reply directly to this email to respond to ${name}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from portfolio at ${new Date().toLocaleString()}
Reply to this email to respond to ${name}
      `
    });

    if (error) {
      console.error("Resend API error:", error);
      throw error;
    }

    console.log(`✅ Email sent successfully via Resend: ${data.id}`);

    res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      messageId: data.id
    });

  } catch (error) {
    console.error("Error sending email:", error);
    
    let userMessage = "Failed to send message. Please try emailing directly.";
    
    if (error.message && error.message.includes("API key")) {
      console.error("❌ Invalid Resend API key");
      userMessage = "Email service authentication failed. Please contact the site administrator.";
    }

    res.status(500).json({
      success: false,
      message: userMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  Portfolio Contact Backend Server          ║
║  Status: Running ✓                         ║
║  Port: ${PORT}                                ║
║  Environment: ${process.env.NODE_ENV || "production"}              ║
║  Time: ${new Date().toLocaleString()}     ║
╚════════════════════════════════════════════╝
  `);
  
  // Check environment variables
  console.log("\n📧 Email Service Configuration:");
  
  if (process.env.RESEND_API_KEY) {
    console.log("✅ Resend API Key: Set");
    console.log("✅ Service: Resend HTTP API (works everywhere!)");
    console.log("   From Email:", process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev");
    console.log("   To Email:", process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER || "shubhampatra635@gmail.com");
  } else {
    console.log("❌ No email service configured!");
    console.log("\nPlease set: RESEND_API_KEY");
    console.log("Get your API key at: https://resend.com/api-keys");
  }
  
  console.log("\n");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
