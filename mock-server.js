const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom login endpoint
server.post("/api/v1/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  // Demo credentials
  if (email === "demo@test.com" && password === "Demo@123") {
    res.json({
      message: "Login successful",
      user: {
        id: "1",
        name: "Demo User",
        email: "demo@test.com",
        createdAt: new Date().toISOString()
      },
      token: "demo-token-123"
    });
  } else if (email === "user@test.com" && password === "User@123") {
    res.json({
      message: "Login successful",
      user: {
        id: "2",
        name: "Test User",
        email: "user@test.com",
        createdAt: new Date().toISOString()
      },
      token: "user-token-123"
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Custom register endpoint
server.post("/api/v1/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };
  
  // Add to database
  const db = router.db;
  db.get("users").push(newUser).write();
  
  res.json({
    message: "Registration successful",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    },
    token: `token-${Date.now()}`
  });
});

// Custom me endpoint
server.get("/api/v1/auth/me", (req, res) => {
  const token = req.headers.authorization;
  
  if (token === "Bearer demo-token-123") {
    res.json({
      user: {
        id: "1",
        name: "Demo User",
        email: "demo@test.com",
        createdAt: new Date().toISOString()
      }
    });
  } else {
    res.status(401).json({ error: "Invalid token" });
  }
});

server.use("/api/v1", router);
server.listen(3001, () => {
  console.log("✅ Mock JSON Server is running on http://localhost:3001");
  console.log("📝 Demo credentials:");
  console.log("   - Email: demo@test.com / Password: Demo@123");
  console.log("   - Email: user@test.com / Password: User@123");
});
