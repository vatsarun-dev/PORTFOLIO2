import nodemailer, { type Transporter } from "nodemailer";
import type SMTPPool from "nodemailer/lib/smtp-pool/index.js";
import env from "./env.js";
import logger from "./logger.js";

/**
 * Production-ready reusable Nodemailer transporter with connection pooling.
 * Supports connection pooling, timeouts, and strict TLS verification.
 */
const transportOptions: SMTPPool.Options = {
  service:"gmail",
  secure: env.SMTP_SECURE,
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  connectionTimeout: 10_000, // 10s connection timeout
  greetingTimeout: 10_000, // 10s greeting timeout
  socketTimeout: 15_000, // 15s socket inactivity timeout
  auth:
    env.SMTP_USER && env.SMTP_PASSWORD
      ? {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        }
      : undefined,
  tls: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true, // Strict certificate validation
  },
};

const transporter: Transporter = nodemailer.createTransport(transportOptions);

/**
 * Verify transporter connection configuration.
 */
export async function verifyTransporter(): Promise<boolean> {
  if (!env.SMTP_USER || !env.SMTP_PASSWORD) {
    logger.warn(
      "SMTP credentials are not configured in environment. Outgoing emails will require valid SMTP credentials.",
    );
    return false;
  }

  try {
    await transporter.verify();
    logger.info("SMTP transporter verified successfully and ready.");
    return true;
  } catch (error: unknown) {
    logger.error(
      { err: error instanceof Error ? error.message : String(error) },
      "SMTP transporter verification failed.",
    );
    return false;
  }
}

/**
 * Gracefully close transporter connection pool during server shutdown.
 */
export function closeTransporter(): void {
  try {
    transporter.close();
    logger.info("SMTP transporter connection pool closed.");
  } catch (error: unknown) {
    logger.error(
      { err: error instanceof Error ? error.message : String(error) },
      "Error closing SMTP transporter.",
    );
  }
}

export default transporter;
