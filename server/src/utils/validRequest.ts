import type { Request, Response, NextFunction } from "express";
import { validationResult, type ValidationError } from "express-validator";

export interface FormattedValidationError {
  field: string;
  msg: string;
}

export default async function validRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const error = validationResult(req);
  if (error.isEmpty()) return next();

  const errors: FormattedValidationError[] = error
    .array()
    .map((err: ValidationError) => ({
      field: "path" in err ? String(err.path) : "field",
      msg: String(err.msg),
    }));

  return res.status(422).json({
    success: false,
    message: "Validation failed",
    errors,
  });
}
