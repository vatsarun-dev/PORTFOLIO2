import type { Request, Response, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import env from "../config/env.js";
import logger from "../config/logger.js";

/**
 * Tracks the number of currently active / in-flight requests on this Node.js instance.
 */
let activeRequests = 0;

/**
 * Returns the current number of in-flight active requests.
 */
export function getActiveRequestsCount(): number {
  return activeRequests;
}

/**
 * Returns the maximum allowed in-flight requests configured for this instance.
 */
export function getMaxConcurrentRequests(): number {
  return env.MAX_CONCURRENT_REQUESTS_PER_INSTANCE;
}

/**
 * Concurrency Limiter Middleware
 * Enforces MAX_CONCURRENT_REQUESTS_PER_INSTANCE (default 100) simultaneous active requests.
 * Excess requests are rejected with 503 Service Unavailable + Retry-After header.
 */
export default function concurrencyMiddleware(
  maxConcurrent: number = env.MAX_CONCURRENT_REQUESTS_PER_INSTANCE,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Exclude basic liveness probe from concurrency rejection so load balancer can check process health
    if (req.path === "/health/liveness" || req.path === "/liveness") {
      return next();
    }

    if (activeRequests >= maxConcurrent) {
      logger.warn(
        {
          activeRequests,
          maxConcurrent,
          path: req.path,
          method: req.method,
        },
        "Max concurrent in-flight requests limit reached; rejecting request with 503",
      );

      res
        .status(StatusCodes.SERVICE_UNAVAILABLE)
        .set("Retry-After", "2")
        .json({
          success: false,
          message:
            "Server is currently at maximum concurrent request capacity. Please retry shortly.",
        });
      return;
    }

    activeRequests++;

    let cleanedUp = false;
    const cleanup = (): void => {
      if (!cleanedUp) {
        cleanedUp = true;
        activeRequests = Math.max(0, activeRequests - 1);
      }
    };

    res.once("finish", cleanup);
    res.once("close", cleanup);

    next();
  };
}
