import jwt from "jsonwebtoken";
import type { Types } from "mongoose";
import env from "../config/env.js";

export const generateAccessToken = (id: string | Types.ObjectId): string => {
  return jwt.sign({ id: String(id) }, env.ACCESSTOKEN, { expiresIn: "10m" });
};

export const generateRefreshToken = (id: string | Types.ObjectId): string => {
  return jwt.sign({ id: String(id) }, env.REFRESHTOKEN, { expiresIn: "10m" });
};
