// Verify Gmail credentials
const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("\n🔐 Verifying Gmail Credentials...\n");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

// Check if credentials are set
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ NOT SET");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Set (length: " + process.env.EMAIL_PASS.length + ")" : "❌ NOT SET");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.log("❌ Email credentials are not set in .env file!\n");
  console.log("Please add:");
  console.log("EMAIL_USER=your-email@gmail.com");
  console.log("EMAIL_PASS=your-app-password\n");
  process.exit(1);
}

// Check password format
if (process.env.EMAIL_PASS.includes(" ")) {
  console.log("⚠️  WARNING: EMAIL_PASS contains spaces!");
  console.log("App Passwords should not have spaces.");
  console.log("Remove all spaces from your App Password.\n");
}

if (process.env.EMAIL_PASS.length !== 16) {
  console.log("⚠️  WARNING: EMAIL_PASS length is", process.env.EMAIL_PASS.length);
  console.log("Gmail App Passwords are typically 16 characters.");
  console.log("Make sure you're using an App Password, not your regular Gmail password.\n");
}

// Try to connect
console.log("🔄 Attempting to connect to Gmail SMTP...\n");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ AUTHENTICATION FAILED!\n");
    console.log("Error:", error.message);
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔧 How to fix this:\n");
    console.log("1. Go to https://myaccount.google.com/security");
    console.log("2. Make sure 2-Step Verification is ON");
    console.log("3. Go to 2-Step Verification → App passwords (at bottom)");
    console.log("4. Generate a NEW App Password:");
    console.log("   - Select: Mail");
    console.log("   - Device: Other (Custom name)");
    console.log("   - Name: Portfolio Contact");
    console.log("5. Copy the 16-character password (remove spaces)");
    console.log("6. Update EMAIL_PASS in .env file");
    console.log("7. Restart the server");
    console.log("\n⚠️  IMPORTANT:");
    console.log("- Use App Password, NOT your regular Gmail password");
    console.log("- Remove ALL spaces from the password");
    console.log("- Make sure it's exactly 16 characters");
    console.log("\n📖 See GMAIL_SETUP.md for detailed instructions");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } else {
    console.log("✅ SUCCESS! Gmail credentials are valid!\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✓ SMTP connection successful");
    console.log("✓ Authentication passed");
    console.log("✓ Ready to send emails");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("🎉 Your contact form is ready to use!");
    console.log("   Try submitting the form on your website.\n");
  }
});
