import z from "zod";
import dotenv from "dotenv";
import logger from "./logger.js";
import constant from "../constant/app.constant.js";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(constant.PORT),
  MONGO_URL: z.string().default(constant.MONGO_URL),
  GOOGLE_CALLBACK_URL: z.string().min(1, "GOOGLE_CALLBACK_URL is required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  ACCESSTOKEN: z.string().min(1, "ACCESSTOKEN is required"),
  REFRESHTOKEN: z.string().min(1, "REFRESHTOKEN is required"),
  MAX_CONCURRENT_REQUESTS_PER_INSTANCE: z.coerce
    .number()
    .default(constant.MAX_CONCURRENT_REQUESTS),
  TRUST_PROXY: z.string().default(constant.TRUST_PROXY),
  CLIENT_URL: z.string().default(constant.CLIENT_URL),
  SMTP_HOST: z.string().default(constant.SMTP_HOST),
  SMTP_PORT: z.coerce.number().default(constant.SMTP_PORT),
  SMTP_SECURE: z
    .preprocess((val) => {
      if (typeof val === "boolean") return val;
      if (typeof val === "string") return val.toLowerCase() === "true" || val === "1";
      return false;
    }, z.boolean())
    .default(constant.SMTP_SECURE),
  SMTP_USER: z.string().default(constant.SMTP_USER),
  SMTP_PASSWORD: z.string().default(constant.SMTP_PASSWORD),
  SMTP_FROM: z.string().default(constant.SMTP_FROM),
  BREVO_API_KEY: z.string().default(constant.BREVO_API_KEY),
});

export type EnvConfig = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const missingKeys = parsed.error.issues
    .map((issue) => issue.path.join("."))
    .join(", ");
  logger.error(
    `Environment validation failed. Missing or invalid variables: ${missingKeys}`,
  );
  process.exit(1);
}

const env: EnvConfig = parsed.data;

export default env;
