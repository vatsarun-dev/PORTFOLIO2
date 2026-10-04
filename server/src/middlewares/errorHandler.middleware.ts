import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import type ApiError from "../shared/error/ApiError.js";
import logger from "../config/logger.js";

export default function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Response {
  const statusCode =
    "statusCode" in err && typeof err.statusCode === "number"
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;

  // Log technical error details safely through existing Pino logger
  logger.error(
    {
      statusCode,
      err: err.message,
      path: req.path,
      method: req.method,
      requestId: req.headers["x-request-id"],
    },
    "Request error encountered",
  );

  // For 500 Internal Server Errors, mask low-level technical/driver details from client
  const isInternalError = statusCode === StatusCodes.INTERNAL_SERVER_ERROR;
  const clientMessage = isInternalError
    ? "Internal Server Error"
    : err.message || "An unexpected error occurred";

  return res.status(statusCode).json({
    success: false,
    message: clientMessage,
  });
}
