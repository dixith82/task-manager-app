// Test script to check backend connection
const testBackend = async () => {
  console.log("Testing backend connection...");
  
  try {
    // Test 1: Direct fetch to health endpoint
    console.log("Test 1: Fetching /health endpoint...");
    const healthResponse = await fetch("http://localhost:5001/health");
    const healthData = await healthResponse.json();
    console.log("✅ Health endpoint:", healthData);
    
    // Test 2: Try registration
    console.log("\nTest 2: Testing registration...");
    const registerResponse = await fetch("http://localhost:5001/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test" + Date.now() + "@test.com",
        password: "Test@123"
      })
    });
    
    const registerData = await registerResponse.json();
    console.log("✅ Registration response:", registerData);
    
    // Test 3: Try login with demo credentials
    console.log("\nTest 3: Testing login with demo credentials...");
    const loginResponse = await fetch("http://localhost:5001/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "demo@test.com",
        password: "Demo@123"
      })
    });
    
    const loginData = await loginResponse.json();
    console.log("✅ Login response:", loginData);
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("Full error:", error);
  }
};

// Run the test
testBackend();
