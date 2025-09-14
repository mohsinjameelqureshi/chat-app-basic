import express from "express";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/apiError.js";

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

// --------------------
// ✅ Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err); // always log error to terminal

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // fallback for unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export { app };
