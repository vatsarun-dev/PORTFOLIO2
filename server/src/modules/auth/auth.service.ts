import UserRepo from "../../repository/auth.repo.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";
import type { UserDocument } from "../../models/auth.model.js";
import type { GoogleProfile } from "../../types/express.d.ts";
import MailService from "../mail/mail.service.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import bcrypt from "bcrypt";

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  mobile: number;
  designation?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse<T = UserDocument> {
  accessToken: string;
  refreshToken: string;
  user?: T;
  isExisted?: T;
}

export default class AuthService {
  private authService: UserRepo;
  private mailService: MailService;

  constructor() {
    this.authService = new UserRepo();
    this.mailService = new MailService();
  }

  // THIS IS THE REGISTRATION LOGIC
  async createUserService(data: RegisterDTO): Promise<AuthResponse<UserDocument>> {
    const { name, email, password, mobile } = data;
    if (!name || !email || !password || !mobile)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");
    const user = await this.authService.createUser(data);
    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user };
  }

  // THIS IS LOGIN LOGIC
  async loginUserService(data: LoginDTO): Promise<AuthResponse<UserDocument>> {
    const { email, password } = data;

    if (!email || !password)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.authService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");

    const compare = isExisted.comparePassword(password);

    if (!compare) throw new error.UNAUTHORIZED("Wrong Credential");

    const accessToken = token.generateAccessToken(isExisted._id);
    const refreshToken = token.generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return { accessToken, refreshToken, isExisted };
  }

  async GoogleLoginService(data: GoogleProfile): Promise<AuthResponse<UserDocument>> {
    const email = data.emails?.[0]?.value;
    if (!email) throw new error.NOTFOUNDERROR("Google account email not found");

    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");

    const user = await this.authService.createUser({
      email,
      name: data.displayName,
      authProvider: (data.provider as "local" | "google") || "google",
    });

    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user };
  }

  async forgotPasswordService(data: { email: string }): Promise<void> {
    const { email } = data;
    const isExisted = await this.authService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");

    const resetToken = jwt.sign(
      { id: String(isExisted._id) },
      env.ACCESSTOKEN,
      { expiresIn: "15m" },
    );

    const link = `http://localhost:${env.PORT || 3000}/api/user/reset-password/${resetToken}`;
    await this.mailService.sendPasswordResetMail(
      isExisted.email,
      isExisted.name || "User",
      link,
    );
  }

  async resetPasswordService(data: { token: string }): Promise<UserDocument> {
    const { token: resetToken } = data;
    try {
      const decode = jwt.verify(resetToken, env.ACCESSTOKEN) as { id: string };
      const user = await this.authService.findById(decode.id);
      if (!user) throw new error.NOTFOUNDERROR("user not found");
      return user;
    } catch {
      throw new error.UNAUTHORIZED("Invalid or expired reset token");
    }
  }

  async updatePasswordService(
    _id: { id: string },
    pass: { password: string },
  ): Promise<UserDocument | null> {
    const { id } = _id;
    const { password } = pass;
    const user = await this.authService.findById(id);
    if (!user) throw new error.NOTFOUNDERROR("user not found");
    const hashPassword = await bcrypt.hash(password, 10);

    const update = await this.authService.updatePassword(id, hashPassword);
    return update;
  }
}
