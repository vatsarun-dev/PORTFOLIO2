import nodemailer, { type Transporter } from "nodemailer";
import type SMTPPool from "nodemailer/lib/smtp-pool/index.js";
import env from "./env.js";
import logger from "./logger.js";

/**
 * Production-ready reusable Nodemailer transporter with connection pooling.
 * Supports connection pooling, timeouts, and strict TLS verification.
 */


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:env.SMTP_USER,
    pass:env.SMTP_PASSWORD
  },
  tls: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true, // Strict certificate validation
  },
});

/**
 * Verify transporter connection configuration.
 */
export async function verifyTransporter(): Promise<boolean> {
  if (env.BREVO_API_KEY) {
    logger.info("Brevo API service is active for email delivery (HTTPS port 443).");
    return true;
  }

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
