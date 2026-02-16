

// The verifyToken middleware is imported to protect certain routes by ensuring that the incoming requests contain a valid JWT token. This middleware checks the authorization header for a token, verifies it, and allows access to the route if the token is valid. If the token is missing or invalid, it responds with an appropriate error message.
const verifyToken = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");

const jobRoutes = require("./routes/jobRoutes");



// jwt is imported to create and verify JSON Web Tokens for user authentication. It allows us to generate a token upon successful login, which can be used to authenticate subsequent requests to protected routes in the application.
const jwt = require("jsonwebtoken");

const connection = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://job-tracker-frontend-weld.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);


// // JWT Authentication Middleware

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (!authHeader) {
//     return res.status(403).json({ message: "Access denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, "mySecretKey", (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token." });
//     }

//     req.user = decoded;
//     next();
//   });
// };

// Health Check Route 
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});


// Test Route
app.get("/", (req, res) => {
  res.send("Job Tracker Backend Running 🚀");
});

// Import bcrypt for password hashing
const bcrypt = require("bcryptjs");

// User Registration

// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

//     connection.query(query, [name, email, hashedPassword], (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "User registration failed", error: err });
//       }

//       res.status(201).json({ message: "User registered successfully" });
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // User Login
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const query = "SELECT * FROM users WHERE email = ?";

//   connection.query(query, [email], async (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (results.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const user = results[0];

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       "mySecretKey",
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token: token
//     });
//   });
// });

// Protected Route
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });
});

// Error Handling Middleware
const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);


// Add Job Route
// app.post("/jobs", verifyToken, (req, res) => {
//   const { company, position, status } = req.body;

//   const userId = req.user.id;

//   const query = `
//     INSERT INTO jobs (company, position, status, user_id)
//     VALUES (?, ?, ?, ?)
//   `;

//   connection.query(
//     query,
//     [company, position, status || "Applied", userId],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Failed to add job" });
//       }

//       res.status(201).json({ message: "Job added successfully" });
//     }
//   );
// });

// // Get Jobs Route
// app.get("/jobs", verifyToken, (req, res) => {
//   const userId = req.user.id;

//   const query = "SELECT * FROM jobs WHERE user_id = ?";

//   connection.query(query, [userId], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to fetch jobs" });
//     }

//     res.status(200).json(results);
//   });
// });

// // Update Job Route
// app.put("/jobs/:id", verifyToken, (req, res) => {
//   const jobId = req.params.id;
//   const { status } = req.body;
//   const userId = req.user.id;

//   const query = `
//     UPDATE jobs
//     SET status = ?
//     WHERE id = ? AND user_id = ?
//   `;

//   connection.query(query, [status, jobId, userId], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to update job" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Job not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Job updated successfully" });
//   });
// });


// // Delete Job Route
// app.delete("/jobs/:id", verifyToken, (req, res) => {
//   const jobId = req.params.id;
//   const userId = req.user.id;

//   const query = `
//     DELETE FROM jobs
//     WHERE id = ? AND user_id = ?
//   `;

//   connection.query(query, [jobId, userId], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to delete job" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Job not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Job deleted successfully" });
//   });
// });

// Start the server
const PORT = process.env.PORT || 5000;

// Note: In production, consider using environment variables for the port and database credentials
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsb3ZlQGdtYWlsLmNvbSIsImlhdCI6MTc3MTA3ODkyMSwiZXhwIjoxNzcxMDgyNTIxfQ.Jg0g7s0Bs4P0zdDXTzOoupmzMuS7w_646gig-pn_3UI