import type { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";

/**
 * Lightweight request ID middleware.
 * Uses existing client correlation ID if provided in X-Request-Id header,
 * or generates a cryptographic UUIDv4.
 */
export default function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const incomingId = req.headers["x-request-id"];
  const requestId =
    typeof incomingId === "string" && incomingId.trim().length > 0
      ? incomingId.trim()
      : crypto.randomUUID();

  req.headers["x-request-id"] = requestId;
  res.setHeader("X-Request-Id", requestId);

  next();
}
