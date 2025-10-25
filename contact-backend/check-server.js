// Check if the server is running
const http = require('http');

console.log("\n🔍 Checking if backend server is running...\n");

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/health',
  method: 'GET',
  timeout: 2000
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log("✅ Server is running!");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Status:", response.status);
      console.log("Uptime:", Math.floor(response.uptime), "seconds");
      console.log("Time:", response.timestamp);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("\n✓ You can now test the contact form!");
      console.log("  Run: npm test\n");
    } catch (error) {
      console.log("⚠️  Server responded but with unexpected data");
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.log("❌ Server is NOT running!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n📝 To start the server:");
  console.log("  1. Open a new terminal");
  console.log("  2. cd contact-backend");
  console.log("  3. npm run dev");
  console.log("\n⏳ Wait for this message:");
  console.log("  ╔════════════════════════════════════════════╗");
  console.log("  ║  Portfolio Contact Backend Server          ║");
  console.log("  ║  Status: Running ✓                         ║");
  console.log("  ╚════════════════════════════════════════════╝");
  console.log("\n📌 Then run the test again:");
  console.log("  npm test\n");
});

req.on('timeout', () => {
  console.log("⏱️  Connection timeout - server is not responding");
  req.destroy();
});

req.end();
