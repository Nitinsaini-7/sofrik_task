import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import projectRoutes from "./routes/project-routes.js";
import taskRoutes from "./routes/task-routes.js";

dotenv.config();
const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",        // Vite local dev
  "https://sofrik-task-hs1f.vercel.app" // Replace with your actual Vercel frontend URL
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
