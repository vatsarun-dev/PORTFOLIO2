import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MailService from "./mail.service.js";
import env from "../../config/env.js";
import ApiError from "../../shared/error/ApiError.js";

export interface SendMailRequestBody {
  to?: string;
  subject: string;
  message: string;
  name?: string;
  replyTo?: string;
}

export default class MailController {
  private mailService: MailService;

  constructor() {
    this.mailService = new MailService();
  }

  /**
   * Controller to send general email or contact notification
   */
  async sendMailController(req: Request, res: Response): Promise<void> {
    const { to, subject, message, name, replyTo } =
      req.body as SendMailRequestBody;

    const recipient = to || env.SMTP_USER;

    if (!recipient) {
      throw new ApiError(
        "Recipient email is required or must be configured in SMTP_USER",
        StatusCodes.BAD_REQUEST,
      );
    }

    const result = await this.mailService.sendContactNotification(
      recipient,
      name || "Recipient",
      subject,
      message,
      replyTo,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Email dispatched successfully",
      data: {
        messageId: result.messageId,
      },
    });
  }
}
