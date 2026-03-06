import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import { createApp } from "./app";
import { env, validateEnv } from "./config/env";
import { closePool } from "./config/database";
import { redis, closeRedis } from "./config/redis";
import { setSocketIO } from "./socketio";
import { startCron, stopCron } from "./services/cron";
import { logger } from "./config/logger";

async function main() {
  validateEnv();

  const app = createApp();
  const httpServer = createServer(app);

  // Socket.IO
  const io = new SocketServer(httpServer, {
    cors: {
      origin: (_origin, callback) => callback(null, true),
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  setSocketIO(io);

  io.on("connection", (socket) => {
    logger.debug({ id: socket.id }, "Socket.IO client connected");
    socket.on("disconnect", () => {
      logger.debug({ id: socket.id }, "Socket.IO client disconnected");
    });
  });

  // Connect Redis
  await redis.connect();

  // Start cron (holder count updates)
  startCron(io);

  // Start HTTP server
  httpServer.listen(env.PORT, () => {
    logger.info({ port: env.PORT, env: env.NODE_ENV }, "Server started");
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info({ signal }, "Shutdown signal received");

    stopCron();
    io.close();
    httpServer.close();
    await closePool();
    await closeRedis();

    logger.info("Shutdown complete");
    process.exit(0);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  // Force exit after 30s
  const forceExit = () => {
    logger.error("Forced exit after timeout");
    process.exit(1);
  };

  process.on("SIGTERM", () => setTimeout(forceExit, 30_000).unref());
  process.on("SIGINT", () => setTimeout(forceExit, 30_000).unref());

  process.on("uncaughtException", (err) => {
    logger.fatal({ err }, "Uncaught exception");
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    logger.fatal({ err }, "Unhandled rejection");
    process.exit(1);
  });
}

main().catch((err) => {
  logger.fatal({ err }, "Failed to start server");
  process.exit(1);
});
