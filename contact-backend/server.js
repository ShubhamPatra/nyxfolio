const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Check which email service to use
const USE_SENDGRID = process.env.SENDGRID_API_KEY ? true : false;
const USE_RESEND = process.env.RESEND_API_KEY ? true : false;

// Load environment variables
dotenv.config();

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
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    version: "2.0.0",
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
    // Create transporter based on available service
    let transporter;
    
    if (USE_RESEND) {
      // Resend configuration (simplest option)
      transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY
        }
      });
      console.log("Using Resend for email delivery");
    } else if (USE_SENDGRID) {
      // SendGrid configuration (recommended for production)
      transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY
        }
      });
      console.log("Using SendGrid for email delivery");
    } else {
      // Gmail configuration (for development/testing)
      transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000
      });
      console.log("Using Gmail for email delivery");
    }

    // Verify transporter configuration with timeout
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('SMTP verification timeout')), 10000)
      )
    ]);

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
    const fromEmail = USE_RESEND
      ? process.env.RESEND_FROM_EMAIL || process.env.EMAIL_USER
      : USE_SENDGRID 
        ? process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER
        : process.env.EMAIL_USER;
    
    const toEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER;
    
    const mailOptions = {
      from: `"Portfolio Contact Form" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      html: htmlTemplate,
      text: textTemplate
    };

    // Send email with timeout
    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 15000)
      )
    ]);

    console.log(`Email sent successfully: ${info.messageId}`);

    res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    let userMessage = "Failed to send message. Please try again later.";
    
    // Detailed error logging and user-friendly messages
    if (USE_RESEND) {
      console.error("\n❌ RESEND ERROR ❌");
      if (error.code === "EAUTH" || error.responseCode === 535) {
        console.error("Resend API key is invalid or not set.");
        console.error("Current RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Set (starts with: " + process.env.RESEND_API_KEY.substring(0, 6) + "...)" : "NOT SET");
        userMessage = "Email service authentication failed. Please contact the site administrator.";
      } else {
        console.error("Resend service error. Check API key and from email.");
        console.error("From Email:", process.env.RESEND_FROM_EMAIL || "NOT SET");
      }
    } else if (USE_SENDGRID) {
      console.error("\n❌ SENDGRID ERROR ❌");
      if (error.code === "EAUTH" || error.responseCode === 535) {
        console.error("SendGrid API key is invalid or not set.");
        userMessage = "Email service authentication failed. Please contact the site administrator.";
      }
    } else {
      // Gmail errors
      if (error.code === "EAUTH" || error.responseCode === 535) {
        console.error("\n❌ AUTHENTICATION ERROR ❌");
        console.error("Gmail credentials are incorrect or not set up properly.");
        console.error("\nPlease follow these steps:");
        console.error("1. Check that EMAIL_USER and EMAIL_PASS are set in environment");
        console.error("2. Make sure you're using a Gmail App Password (not your regular password)");
        console.error("3. Enable 2FA on your Gmail account first");
        console.error("\nCurrent EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
        console.error("EMAIL_PASS is set:", !!process.env.EMAIL_PASS ? "Yes" : "No");
        
        userMessage = "Email service authentication failed. Please try emailing directly.";
      } else if (error.code === "ESOCKET" || error.code === "ETIMEDOUT" || error.message.includes('timeout')) {
        console.error("\n❌ CONNECTION TIMEOUT ❌");
        console.error("Cannot connect to Gmail SMTP server.");
        console.error("This might be due to:");
        console.error("1. Firewall blocking SMTP ports (587/465)");
        console.error("2. Network restrictions on hosting platform (Render blocks SMTP)");
        console.error("3. Gmail temporarily blocking the connection");
        console.error("\n💡 SOLUTION: Use Resend or SendGrid instead!");
        
        userMessage = "Connection timeout. Please try emailing directly or try again later.";
      } else if (error.code === "ECONNECTION") {
        console.error("Connection error. SMTP server unreachable");
        userMessage = "Cannot reach email server. Please try emailing directly.";
      }
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
  console.log("\n📧 Email Service Configuration:");
  
  if (process.env.RESEND_API_KEY) {
    console.log("✓ Resend API Key: Set");
    console.log("✓ Service: Resend (recommended)");
    console.log("  From Email:", process.env.RESEND_FROM_EMAIL || process.env.EMAIL_USER || "❌ NOT SET");
    console.log("  To Email:", process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER || "❌ NOT SET");
  } else if (process.env.SENDGRID_API_KEY) {
    console.log("✓ SendGrid API Key: Set");
    console.log("✓ Service: SendGrid");
    console.log("  From Email:", process.env.SENDGRID_FROM_EMAIL || process.env.EMAIL_USER || "❌ NOT SET");
    console.log("  To Email:", process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER || "❌ NOT SET");
  } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log("⚠️  Service: Gmail (may not work on Render)");
    console.log("  EMAIL_USER:", process.env.EMAIL_USER);
    console.log("  EMAIL_PASS: Set");
    console.log("\n⚠️  WARNING: Gmail SMTP is blocked on most hosting platforms!");
    console.log("  Consider using Resend or SendGrid instead.");
  } else {
    console.log("❌ No email service configured!");
    console.log("\nPlease set one of the following:");
    console.log("1. RESEND_API_KEY + RESEND_FROM_EMAIL (recommended)");
    console.log("2. SENDGRID_API_KEY + SENDGRID_FROM_EMAIL");
    console.log("3. EMAIL_USER + EMAIL_PASS (Gmail - may not work)");
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
