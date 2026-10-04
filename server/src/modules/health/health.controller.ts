import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import {
  getActiveRequestsCount,
  getMaxConcurrentRequests,
} from "../../middlewares/concurrency.middleware.js";

let isServerShuttingDown = false;

export function markServerShuttingDown(): void {
  isServerShuttingDown = true;
}

export function isShuttingDown(): boolean {
  return isServerShuttingDown;
}

export default class HealthController {
  /**
   * Liveness probe: verifies that the Node process is responsive.
   */
  livenessController(_req: Request, res: Response): void {
    res.status(StatusCodes.OK).json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Readiness probe: used by Load Balancer to determine if this instance should receive traffic.
   * Returns 503 if the database is disconnected, or if the instance is shutting down.
   */
  readinessController(_req: Request, res: Response): void {
    if (isServerShuttingDown) {
      res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        status: "not_ready",
        reason: "Server instance is shutting down",
      });
      return;
    }

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbState = mongoose.connection.readyState;
    const isDbConnected = dbState === 1;

    if (!isDbConnected) {
      res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        status: "not_ready",
        reason: "Database connection unavailable",
        dbState,
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      status: "ready",
      database: "connected",
      activeRequests: getActiveRequestsCount(),
      maxConcurrentRequests: getMaxConcurrentRequests(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
}
