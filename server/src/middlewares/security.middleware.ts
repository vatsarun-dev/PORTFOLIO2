import type { Application } from "express";
import express from "express";
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import env from "../config/env.js";
import requestIdMiddleware from "./requestId.middleware.js";
import concurrencyMiddleware from "./concurrency.middleware.js";

export default function securityMiddleware(app: Application): void {
  // 1. Trust proxy configuration for load balancers / reverse proxies
  if (env.TRUST_PROXY) {
    const proxySetting =
      env.TRUST_PROXY === "true"
        ? true
        : env.TRUST_PROXY === "false"
        ? false
        : !isNaN(Number(env.TRUST_PROXY))
        ? Number(env.TRUST_PROXY)
        : env.TRUST_PROXY;
    app.set("trust proxy", proxySetting);
  }

  // 2. Request tracing and structured logging
  app.use(requestIdMiddleware);
  app.use(morgan("dev"));

  // 3. Concurrency Limiter: strictly caps in-flight requests per instance
  app.use(concurrencyMiddleware());

  // 4. Request payload parsing with sensible production limits
  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
  app.use(cookieParser());

  // 5. Cross-Origin Resource Sharing (CORS)
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://arun-portfolio-lake-five.vercel.app",
    env.CLIENT_URL,
  ].filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like curl, server-to-server, or mobile)
        if (!origin) return callback(null, true);
        const isExplicitlyAllowed = allowedOrigins.includes(origin);
        const isVercelSubdomain = /^https:\/\/([a-z0-9-]+\.)?vercel\.app$/.test(origin);
        if (isExplicitlyAllowed || isVercelSubdomain) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    }),
  );

  // 6. Security headers and payload parameter pollution protection
  app.use(passport.initialize());
  app.use(hpp());
  app.use(helmet());
  app.use(compression());

  // 7. Rate limiting (separate from concurrency control)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      message: "too much devices",
      limit: 100,
      legacyHeaders: true,
    }),
  );
}
