// Simple test script to verify the contact API
const http = require('http');

const testData = {
  name: "Test User",
  email: "test@example.com",
  message: "This is a test message to verify the contact form backend is working correctly."
};

console.log("\n🧪 Testing Contact API...");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("Sending data:", testData);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Response Status: ${res.statusCode}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log("\n📨 Response Data:");
      console.log(JSON.stringify(response, null, 2));
      
      if (response.success) {
        console.log("\n✅ TEST PASSED! Email sent successfully.");
        console.log("Check your inbox:", process.env.EMAIL_USER || "your-email@gmail.com");
      } else {
        console.log("\n❌ TEST FAILED!");
        console.log("Error:", response.message);
        if (response.error) {
          console.log("Details:", response.error);
        }
      }
    } catch (error) {
      console.log("\n❌ Failed to parse response:");
      console.log(data);
    }
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  });
});

req.on('error', (error) => {
  console.log("\n❌ CONNECTION ERROR!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Error:", error.message);
  console.log("\n🔍 Troubleshooting:");
  console.log("1. Make sure the backend server is running:");
  console.log("   cd contact-backend");
  console.log("   npm run dev");
  console.log("\n2. Check that the server is running on port 3001");
  console.log("\n3. Look for this message when starting the server:");
  console.log("   ╔════════════════════════════════════════════╗");
  console.log("   ║  Portfolio Contact Backend Server          ║");
  console.log("   ║  Status: Running ✓                         ║");
  console.log("   ║  Port: 3001                                ║");
  console.log("   ╚════════════════════════════════════════════╝");
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
});

req.write(postData);
req.end();
