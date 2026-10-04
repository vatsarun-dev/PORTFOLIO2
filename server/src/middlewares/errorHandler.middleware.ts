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
  const isApiError = "statusCode" in err && typeof err.statusCode === "number";
  const statusCode = isApiError
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

  // For controlled ApiErrors (e.g. mail service safe message), preserve the custom message.
  // For unhandled raw exceptions (e.g. unexpected crashes), mask with generic message.
  const clientMessage = isApiError && err.message
    ? err.message
    : "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message: clientMessage,
  });
}
