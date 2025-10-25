const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["POST", "GET"],
  credentials: true
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
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
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
    console.log("Validation failed - missing fields:", { 
      hasName: !!name, 
      hasEmail: !!email, 
      hasMessage: !!message 
    });
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and message",
      received: { name: !!name, email: !!email, message: !!message }
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
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify transporter configuration
    await transporter.verify();

    // Email HTML template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 30px 30px 20px 30px;">
                    <h1 style="color: #00ffe0; margin: 0; font-size: 24px; border-bottom: 2px solid #00ffe0; padding-bottom: 10px;">
                      📬 New Contact Form Submission
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
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
                
                <!-- Message Box -->
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; border-left: 4px solid #00ffe0;">
                      <p style="margin: 0 0 10px 0; color: #666; font-weight: bold;">Message:</p>
                      <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px 30px 30px; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0; text-align: center; color: #999; font-size: 12px;">
                      This email was sent from your portfolio contact form at ${new Date().toLocaleString()}
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
    `;

    // Plain text version
    const textTemplate = `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from portfolio contact form at ${new Date().toLocaleString()}
Reply to this email to respond to ${name}
    `;

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: htmlTemplate,
      text: textTemplate
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully: ${info.messageId}`);

    res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("Error sending email:", error);
    
    let userMessage = "Failed to send message. Please try again later.";
    
    // Detailed error logging and user-friendly messages
    if (error.code === "EAUTH" || error.responseCode === 535) {
      console.error("\n❌ AUTHENTICATION ERROR ❌");
      console.error("Gmail credentials are incorrect or not set up properly.");
      console.error("\nPlease follow these steps:");
      console.error("1. Check that EMAIL_USER and EMAIL_PASS are set in .env");
      console.error("2. Make sure you're using a Gmail App Password (not your regular password)");
      console.error("3. See GMAIL_SETUP.md for detailed instructions");
      console.error("\nCurrent EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
      console.error("EMAIL_PASS is set:", !!process.env.EMAIL_PASS ? "Yes" : "No");
      
      userMessage = "Email service is not configured. Please contact the site administrator.";
    } else if (error.code === "ESOCKET") {
      console.error("Network error. Check internet connection");
      userMessage = "Network error. Please check your connection and try again.";
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
║  Environment: ${process.env.NODE_ENV || "development"}              ║
║  Time: ${new Date().toLocaleString()}     ║
╚════════════════════════════════════════════╝
  `);
  
  // Check environment variables
  console.log("\n📧 Email Configuration:");
  console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ NOT SET");
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Set" : "❌ NOT SET");
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("\n⚠️  WARNING: Email credentials not configured!");
    console.log("The contact form will not work until you:");
    console.log("1. Create a .env file in the contact-backend folder");
    console.log("2. Add EMAIL_USER and EMAIL_PASS");
    console.log("3. See GMAIL_SETUP.md for detailed instructions\n");
  } else {
    console.log("✓ Email credentials configured\n");
  }
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
