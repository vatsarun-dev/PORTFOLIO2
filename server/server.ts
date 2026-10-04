import type { Server } from "node:http";
import mongoose from "mongoose";
import createApp from "./src/app.js";
import connectDB from "./src/database/db.js";
import logger from "./src/config/logger.js";
import env from "./src/config/env.js";
import { verifyTransporter, closeTransporter } from "./src/config/nodemailer.js";
import { markServerShuttingDown } from "./src/modules/health/health.controller.js";

let httpServer: Server | null = null;
let isShuttingDown = false;

async function handleGracefulShutdown(signal: string): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;
  markServerShuttingDown();

  logger.info({ signal }, "Received shutdown signal. Commencing graceful shutdown...");

  // Force shutdown after timeout if pending connections hang
  const forceExitTimer = setTimeout(() => {
    logger.error("Graceful shutdown timeout exceeded (15s). Forcing process exit.");
    process.exit(1);
  }, 15_000);
  forceExitTimer.unref();

  if (httpServer) {
    httpServer.close(async (err?: Error) => {
      if (err) {
        logger.error({ err: err.message }, "Error during HTTP server close.");
      } else {
        logger.info("HTTP server closed to new connections. Active requests completed.");
      }

      // Close database connection
      try {
        await mongoose.connection.close(false);
        logger.info("Database connection closed gracefully.");
      } catch (dbErr: unknown) {
        logger.error({ dbErr }, "Error closing database connection.");
      }

      // Close reusable SMTP transporter pool
      closeTransporter();

      clearTimeout(forceExitTimer);
      logger.info("Graceful shutdown complete. Exiting.");
      process.exit(0);
    });
  } else {
    clearTimeout(forceExitTimer);
    process.exit(0);
  }
}

(function startServer(): void {
  connectDB()
    .then(async () => {
      // Verify SMTP transporter connectivity (non-blocking)
      await verifyTransporter();

      const port = env.PORT || 3000;
      const app = createApp();

      httpServer = app.listen(port, () => {
        logger.info(
          {
            port,
            maxConcurrent: env.MAX_CONCURRENT_REQUESTS_PER_INSTANCE,
            trustProxy: env.TRUST_PROXY,
          },
          "Server started successfully and accepting connections",
        );
      });

      // Process lifecycle signal handlers
      process.on("SIGTERM", () => void handleGracefulShutdown("SIGTERM"));
      process.on("SIGINT", () => void handleGracefulShutdown("SIGINT"));

      process.on("unhandledRejection", (reason: unknown) => {
        logger.error({ reason }, "Unhandled Promise Rejection detected.");
      });

      process.on("uncaughtException", (error: Error) => {
        logger.fatal({ err: error.message, stack: error.stack }, "Uncaught Exception detected.");
        void handleGracefulShutdown("uncaughtException");
      });
    })
    .catch((error: unknown) => {
      logger.fatal({ error }, "Failed to initialize application database.");
      process.exit(1);
    });
})();
