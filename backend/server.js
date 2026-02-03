import express from "express";
import cors from "cors";

const app = express();
const PORT = 5001;
const HOST = "127.0.0.1";

// Enable CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Store users and tasks in memory
let users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@test.com",
    password: "Demo@123",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Test User", 
    email: "user@test.com",
    password: "User@123",
    createdAt: new Date().toISOString()
  }
];

let tasks = [
  {
    id: "1",
    title: "Complete internship assignment",
    description: "Build a task manager app with auth and dashboard",
    status: "in_progress",
    priority: "high",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    userId: "1"
  },
  {
    id: "2",
    title: "Learn Next.js 14",
    description: "Study App Router and Server Components",
    status: "pending",
    priority: "medium",
    createdAt: new Date().toISOString(),
    userId: "1"
  }
];

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Backend is running",
    timestamp: new Date().toISOString()
  });
});

// Register
app.post("/api/v1/auth/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Check if user exists
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    const newUser = {
      id: "user_" + Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    const token = "token_" + Date.now();
    
    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      },
      token
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post("/api/v1/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = "token_" + Date.now();
    
    res.json({
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      token
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get profile (protected)
app.get("/api/v1/auth/me", (req, res) => {
  const token = req.headers.authorization;
  
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  // For demo, accept any token
  res.json({
    user: {
      id: "1",
      name: "Demo User",
      email: "demo@test.com",
      createdAt: new Date().toISOString()
    }
  });
});

// Get tasks
app.get("/api/v1/tasks", (req, res) => {
  res.json({
    tasks: tasks,
    pagination: {
      page: 1,
      limit: 10,
      total: tasks.length,
      pages: 1
    }
  });
});

// Create task
app.post("/api/v1/tasks", (req, res) => {
  const { title, description, status, priority } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  
  const newTask = {
    id: "task_" + Date.now(),
    title,
    description: description || "",
    status: status || "pending",
    priority: priority || "medium",
    createdAt: new Date().toISOString(),
    userId: "1"
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    message: "Task created successfully",
    task: newTask
  });
});

app.listen(PORT, HOST, () => {
  console.log("=========================================");
  console.log("🚀 BACKEND STARTED SUCCESSFULLY");
  console.log("=========================================");
  console.log(`📡 URL: http://${HOST}:${PORT}`);
  console.log(`✅ Health: http://${HOST}:${PORT}/health`);
  console.log("")
  console.log("📝 DEMO CREDENTIALS:");
  console.log("   📧 demo@test.com / 🔑 Demo@123");
  console.log("   📧 user@test.com  / 🔑 User@123");
  console.log("")
  console.log("🔗 API ENDPOINTS:");
  console.log("   POST /api/v1/auth/register");
  console.log("   POST /api/v1/auth/login");
  console.log("   GET  /api/v1/tasks");
  console.log("=========================================");
});
