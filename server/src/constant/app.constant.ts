import type { CookieOptions } from "express";

export interface AppConfigConstant {
  PORT: number;
  MONGO_URL: string;
  MAX_CONCURRENT_REQUESTS: number;
  TRUST_PROXY: string;
  CLIENT_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_FROM: string;
}

export interface AppCookieConstant {
  cookie: {
    accessToken: CookieOptions;
    refreshToken: CookieOptions;
  };
}

const defaultConstant: AppConfigConstant = {
  PORT: 5000,
  MONGO_URL: "mongodb://0.0.0.0/constant",
  MAX_CONCURRENT_REQUESTS: 100,
  TRUST_PROXY: "1",
  CLIENT_URL: "https://arun-portfolio-lake-five.vercel.app",
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: 587,
  SMTP_SECURE: false,
  SMTP_USER: "",
  SMTP_PASSWORD: "",
  SMTP_FROM: "no-reply@example.com",
};

export const app_constant: AppCookieConstant = {
  cookie: {
    accessToken: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000,
    },
    refreshToken: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
  },
};

export default defaultConstant;
