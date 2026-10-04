import { body, type ValidationChain } from "express-validator";
import type { RequestHandler } from "express";
import validRequest from "../utils/validRequest.js";

type MiddlewareItem = ValidationChain | RequestHandler;

export const registerValidationRule: MiddlewareItem[] = [
  body("name")
    .trim()
    .not()
    .isIn(["admin", "root", "superuser"])
    .notEmpty()
    .withMessage("Name must be required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 character"),
  body("email")
    .trim()
    .not()
    .contains("+")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid Email"),

  body("designation").trim().optional(),

  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6, max: 10 })
    .withMessage("password must contain 6-10 words")
    .matches(/\d/)
    .withMessage("Must contain at least one digit")
    .matches(/[!@#$%]/)
    .withMessage("Must contain a special character"),
  validRequest as RequestHandler,
];

export const loginValidationRule: MiddlewareItem[] = [
  body("email")
    .trim()
    .not()
    .contains("+")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid Email"),
  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6, max: 10 })
    .withMessage("password must contain 6-10 words")
    .matches(/\d/)
    .withMessage("Must contain at least one digit")
    .matches(/[!@#$%]/)
    .withMessage("Must contain a special character"),
  validRequest as RequestHandler,
];

export const studentValidationRule: MiddlewareItem[] = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Invalid email"),

  body("studentId").notEmpty().withMessage("Student ID is required"),

  body("mobile").isMobilePhone("en-IN").withMessage("Invalid mobile number"),
  validRequest as RequestHandler,
];

export const sendMailValidationRule: MiddlewareItem[] = [
  body("to")
    .trim()
    .optional({ values: "falsy" })
    .isEmail()
    .withMessage("Enter a valid recipient email")
    .custom((value: string) => {
      if (/[\r\n]/.test(value)) {
        throw new Error("Invalid characters detected in email recipient (CRLF injection prevented)");
      }
      return true;
    }),
  body("replyTo")
    .trim()
    .optional({ values: "falsy" })
    .isEmail()
    .withMessage("Enter a valid replyTo email")
    .custom((value: string) => {
      if (/[\r\n]/.test(value)) {
        throw new Error("Invalid characters detected in replyTo email (CRLF injection prevented)");
      }
      return true;
    }),
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Subject must be between 1 and 200 characters")
    .custom((value: string) => {
      if (/[\r\n]/.test(value)) {
        throw new Error("Invalid characters detected in email subject (CRLF injection prevented)");
      }
      return true;
    }),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 1, max: 25000 })
    .withMessage("Message length cannot exceed 25,000 characters"),
  body("name").trim().optional().isLength({ max: 100 }),
  validRequest as RequestHandler,
];

export const forgotPasswordValidationRule: MiddlewareItem[] = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),
  validRequest as RequestHandler,
];
