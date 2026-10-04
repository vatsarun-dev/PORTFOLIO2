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
   * Dispatches an email via the reusable SMTP transporter.
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
