import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/user-model.js";
import Project from "./models/project-model.js";
import Task from "./models/task-model.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Seeding database...");

    // Clear old data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // Create user
    const hashedPassword = await bcrypt.hash("Test@123", 10);
    const user = await User.create({ email: "test@example.com", password: hashedPassword });

    // Create 2 projects
    const project1 = await Project.create({
      title: "Website Redesign",
      description: "Revamp the homepage",
      status: "active",
      userId: user._id,
    });

    const project2 = await Project.create({
      title: "Mobile App",
      description: "Build React Native app",
      status: "completed",
      userId: user._id,
    });

    // Create tasks
    await Task.insertMany([
      { title: "Setup repo", description: "Init GitHub repo", status: "todo", projectId: project1._id },
      { title: "Design UI", description: "Figma wireframe", status: "in-progress", projectId: project1._id },
      { title: "Deploy site", description: "Vercel deployment", status: "done", projectId: project1._id },
      { title: "API integration", description: "Connect backend", status: "todo", projectId: project2._id },
      { title: "Push notifications", description: "Implement FCM", status: "in-progress", projectId: project2._id },
      { title: "Beta release", description: "Test with QA team", status: "done", projectId: project2._id },
    ]);

    console.log("✅ Seed data inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seed();
