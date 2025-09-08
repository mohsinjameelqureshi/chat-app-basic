import express from "express";
import cookieParser from "cookie-parser";

const app = express();

//common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// routes

// healthcheck
app.use("/api/v1/healthcheck", healthCheckRouter);

// auth
app.use("/api/v1/auth", authRoutes);

// message
app.use("/api/v1/messages", messageRoutes);

// users
app.use("/api/v1/users", userRoutes);

export { app };
