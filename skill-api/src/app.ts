import express from "express";
import cors from "cors";
import { join } from "path";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { standardLimiter } from "./middleware/rateLimit";
import healthRoutes from "./routes/health";
import beaconRoutes from "./routes/beacon";
import acknowledgeRoutes from "./routes/acknowledge";
import participateRoutes from "./routes/participate";
import propagateRoutes from "./routes/propagate";
import statsRoutes from "./routes/stats";
import activityRoutes from "./routes/activity";
import socialPostsRoutes from "./routes/socialPosts";

export function createApp(): express.Application {
  const app = express();

  // CORS
  const allowedOrigins = [env.FRONTEND_URL];
  if (env.NODE_ENV === "development") {
    allowedOrigins.push("http://localhost:3000", "http://localhost:3001");
  }

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow no-origin (curl, mobile apps, agents)
        if (!origin) return callback(null, true);
        if (allowedOrigins.some((o) => origin.startsWith(o))) return callback(null, true);
        if (/\.vercel\.app$/.test(origin)) return callback(null, true);
        if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
        // Allow any origin for API routes (agents call from anywhere)
        return callback(null, true);
      },
      credentials: true,
    })
  );

  // Body parsing
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Rate limiting
  if (env.NODE_ENV === "production") {
    app.use(standardLimiter);
  }

  // Serve skill.md from public/
  app.use(express.static(join(__dirname, "..", "public")));

  // Routes
  app.use(healthRoutes);
  app.use(beaconRoutes);
  app.use(acknowledgeRoutes);
  app.use(participateRoutes);
  app.use(propagateRoutes);
  app.use(statsRoutes);
  app.use(activityRoutes);
  app.use(socialPostsRoutes);

  // 404
  app.use((_req, res) => {
    res.status(404).json({ error: "NOT_FOUND", message: "Route not found" });
  });

  // Error handler
  app.use(errorHandler);

  return app;
}
