import { Router } from "express";
import passport from "passport";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";

const authRoutes: Router = Router();
const authController = new AuthController();

authRoutes.post(
  "/register",
  validation.registerValidationRule,
  asyncHandler(authController.createUserController.bind(authController)),
);

authRoutes.post(
  "/login",
  validation.loginValidationRule,
  asyncHandler(authController.loginUserController.bind(authController)),
);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/register",
    session: false,
  }),
  asyncHandler(authController.GoogleLoginController.bind(authController)),
);

authRoutes.post(
  "/forgot_password",
  validation.forgotPasswordValidationRule,
  asyncHandler(authController.forgotPasswordController.bind(authController)),
);

authRoutes.get(
  "/reset-password/:token",
  asyncHandler(authController.resetPasswordController.bind(authController)),
);

authRoutes.post(
  "/update-password/:id",
  asyncHandler(authController.updatePasswordController.bind(authController)),
);

export default authRoutes;
