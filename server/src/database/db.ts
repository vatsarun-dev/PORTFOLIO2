import { connect } from "mongoose";
import env from "../config/env.js";
import logger from "../config/logger.js";

export default async function connectDB(): Promise<void> {
  await connect(env.MONGO_URL);
  logger.info("your database is connected successfully");
}
