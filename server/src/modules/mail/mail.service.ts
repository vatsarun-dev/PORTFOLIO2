import transporter from "../../config/nodemailer.js";
import env from "../../config/env.js";
import logger from "../../config/logger.js";
import ApiError from "../../shared/error/ApiError.js";
import { StatusCodes } from "http-status-codes";
import {
  generatePasswordResetMail,
  generateNotificationMail,
} from "../../utils/generateMail.js";

export interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}

export interface MailSendResult {
  success: boolean;
  messageId?: string;
  accepted?: string[];
}

export default class MailService {
  /**
   * Dispatches an email via Brevo transactional API (HTTPS port 443).
   * Reliable across cloud hosting providers and firewalls.
   */
  private async sendMailViaBrevo(options: SendMailOptions): Promise<MailSendResult> {
    const { to, subject, html, text, replyTo } = options;

    const senderEmail = env.SMTP_USER || "vatsarun58@gmail.com";
    const senderName = "Arun Vats Portfolio";

    const payload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: to,
          name: options.to.split("@")[0] || "Recipient",
        },
      ],
      replyTo: replyTo ? { email: replyTo } : undefined,
      subject,
      htmlContent: html || (text ? `<pre>${text}</pre>` : undefined),
      textContent: text,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        "accept": "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as {
      messageId?: string;
      message?: string;
    } | null;

    if (!response.ok) {
      const errMsg = data?.message || `Brevo API returned status ${response.status}`;
      throw new Error(errMsg);
    }

    logger.info(
      { messageId: data?.messageId, recipient: to },
      "Email dispatched successfully via Brevo API (HTTPS)",
    );

    return {
      success: true,
      messageId: data?.messageId,
      accepted: [to],
    };
  }

  /**
   * Dispatches an email via Brevo service (HTTPS) or reusable SMTP transporter.
   * Ensures technical errors are logged securely and never leaked directly to clients.
   */
  async sendMail(options: SendMailOptions): Promise<MailSendResult> {
    const { to, subject, html, text, replyTo } = options;

    if (!to || !subject || (!html && !text)) {
      throw new ApiError(
        "Recipient, subject, and message content are required",
        StatusCodes.BAD_REQUEST,
      );
    }

    // 1. If Brevo API key is configured, dispatch via HTTPS
    if (env.BREVO_API_KEY) {
      try {
        return await this.sendMailViaBrevo(options);
      } catch (error: unknown) {
        logger.error(
          {
            recipient: to,
            subject,
            err: error instanceof Error ? error.message : String(error),
          },
          "Brevo email dispatch failed",
        );

        throw new ApiError(
          "Failed to send email. Please verify mail configuration or try again later.",
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // 2. Fallback to Nodemailer SMTP transporter
    const mailOptions = {
      from: env.SMTP_FROM,
      to,
      subject,
      html,
      text,
      replyTo,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      logger.info(
        { messageId: info.messageId, recipient: to },
        "Email dispatched successfully via SMTP",
      );

      return {
        success: true,
        messageId: info.messageId,
        accepted: (info.accepted as string[]) || [to],
      };
    } catch (error: unknown) {
      // Technical SMTP logging (never logging sensitive credentials)
      logger.error(
        {
          recipient: to,
          subject,
          err: error instanceof Error ? error.message : String(error),
        },
        "SMTP email dispatch failed",
      );

      // Safe client error (prevents exposing internal mail server topology / credentials)
      throw new ApiError(
        "Failed to send email. Please verify mail configuration or try again later.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Sends a structured password reset link email.
   */
  async sendPasswordResetMail(
    to: string,
    name: string,
    resetLink: string,
  ): Promise<MailSendResult> {
    const content = generatePasswordResetMail(name, resetLink);
    return await this.sendMail({
      to,
      subject: content.subject,
      html: content.html,
      text: content.text,
    });
  }

  /**
   * Sends a structured notification or contact message.
   */
  async sendContactNotification(
    to: string,
    name: string,
    subject: string,
    message: string,
    replyTo?: string,
  ): Promise<MailSendResult> {
    const content = generateNotificationMail(
      subject,
      "New Contact Inquiry",
      message,
      name,
    );
    return await this.sendMail({
      to,
      subject: content.subject,
      html: content.html,
      text: content.text,
      replyTo,
    });
  }
}
