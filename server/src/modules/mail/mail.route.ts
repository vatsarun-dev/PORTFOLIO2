import { Router } from "express";
import MailController from "./mail.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";

const mailRoutes: Router = Router();
const mailController = new MailController();

mailRoutes.post(
  "/send",
  validation.sendMailValidationRule,
  asyncHandler(mailController.sendMailController.bind(mailController)),
);

export default mailRoutes;
