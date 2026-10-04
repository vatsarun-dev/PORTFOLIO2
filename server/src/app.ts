import express, { type Application } from "express";
import securityMiddleware from "./middlewares/security.middleware.js";
import GoogleMiddleware from "./middlewares/googleOauth.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import mailRoutes from "./modules/mail/mail.route.js";
import healthRoutes from "./modules/health/health.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

export default function createApp(): Application {
  const app: Application = express();

  securityMiddleware(app);
  GoogleMiddleware();

  // Health and readiness endpoints for load balancers
  app.use("/health", healthRoutes);
  app.use(healthRoutes);

  // Application domain routes
  app.use("/api/user", authRoutes);
  app.use("/api/mail", mailRoutes);

  app.use(errorHandler);
  return app;
}
