import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import cors from "cors";
// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Log requests in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/user", router);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/doctor", doctorRouter);
// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

// Handle port errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});
