import type { Request, Response } from "express";
import AuthService, { type RegisterDTO, type LoginDTO } from "./auth.service.js";
import { app_constant } from "../../constant/app.constant.js";
import * as error from "../../shared/error/globalError.js";

export default class AuthController {
  private authController: AuthService;

  constructor() {
    this.authController = new AuthService();
  }

  async createUserController(req: Request, res: Response): Promise<void> {
    const user = await this.authController.createUserService(req.body as RegisterDTO);

    res.cookie(
      "accessToken",
      user.accessToken,
      app_constant.cookie.accessToken,
    );
    res.cookie(
      "refreshToken",
      user.refreshToken,
      app_constant.cookie.refreshToken,
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: user.user });
  }

  async loginUserController(req: Request, res: Response): Promise<void> {
    const user = await this.authController.loginUserService(req.body as LoginDTO);
    res.cookie(
      "accessToken",
      user.accessToken,
      app_constant.cookie.accessToken,
    );
    res.cookie(
      "refreshToken",
      user.refreshToken,
      app_constant.cookie.refreshToken,
    );
    res
      .status(200)
      .json({ message: "User login successfully", user: user.isExisted });
  }

  async GoogleLoginController(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new error.UNAUTHORIZED("Google authentication failed");
    }

    const user = await this.authController.GoogleLoginService(req.user);

    res.cookie(
      "accessToken",
      user.accessToken,
      app_constant.cookie.accessToken,
    );
    res.cookie(
      "refreshToken",
      user.refreshToken,
      app_constant.cookie.refreshToken,
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: user.user });
  }

  async forgotPasswordController(req: Request, res: Response): Promise<void> {
    await this.authController.forgotPasswordService(
      req.body as { email: string },
    );
    res.status(200).json({ message: "Password reset email sent successfully" });
  }

  async resetPasswordController(req: Request, res: Response): Promise<void> {
    const user = await this.authController.resetPasswordService(
      req.params as unknown as { token: string },
    );
    res.status(200).json({ message: "reset password token verified", userId: user._id });
  }

  async updatePasswordController(req: Request, res: Response): Promise<void> {
    await this.authController.updatePasswordService(
      req.params as unknown as { id: string },
      req.body as { password: string },
    );
    res.status(200).json({
      message: "user updated successfully",
    });
  }
}
