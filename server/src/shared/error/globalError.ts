import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError.js";

export class NOTFOUNDERROR extends ApiError {
  constructor(
    message: string = "Not Found",
    statusCode: number = StatusCodes.NOT_FOUND,
  ) {
    super(message, statusCode);
  }
}

export class UNAUTHORIZED extends ApiError {
  constructor(
    message: string = "Unauthorized",
    statusCode: number = StatusCodes.UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}

export class ALLREADYEXIST extends ApiError {
  constructor(
    message: string = "Already Exists",
    statusCode: number = StatusCodes.CONFLICT,
  ) {
    super(message, statusCode);
  }
}
