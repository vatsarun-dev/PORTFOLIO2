# Express TypeScript Authentication Backend Template

A production-style Express.js backend template in TypeScript with authentication, MongoDB, Google OAuth, request validation, centralized error handling, security middleware, and structured logging.

## What This Template Includes

- Express 5 server setup using TypeScript and ES modules (`NodeNext`).
- MongoDB connection with Mongoose and strongly-typed models.
- Local user registration and login.
- Password hashing with bcrypt.
- Access token and refresh token generation with JWT.
- Refresh token storage on the user document.
- Google OAuth authentication with Passport.
- Cookie-based token delivery with typed cookie options.
- Request validation using express-validator.
- Environment variable validation using Zod with fail-safe startup.
- Express Request type augmentation for authenticated Google profiles.
- Centralized async error forwarding (`asyncHandler`).
- Centralized error handling middleware with typed status codes.
- Security middleware stack with Helmet, HPP, CORS, rate limiting, compression, cookie parsing, JSON parsing, and Morgan request logs.
- Pino logger with pretty development output.
- Layered backend structure: routes, controllers, services, repository, models, config, middleware, and utilities.

## Folder Structure

```txt
server/
|-- dist/                  # Compiled JavaScript output
|-- src/
|   |-- config/
|   |   |-- env.ts
|   |   |-- logger.ts
|   |-- constant/
|   |   |-- app.constant.ts
|   |-- database/
|   |   |-- db.ts
|   |-- middlewares/
|   |   |-- errorHandler.middleware.ts
|   |   |-- googleOauth.middleware.ts
|   |   |-- security.middleware.ts
|   |-- models/
|   |   |-- auth.model.ts
|   |-- modules/
|   |   |-- auth/
|   |   |   |-- auth.controller.ts
|   |   |   |-- auth.route.ts
|   |   |   |-- auth.service.ts
|   |-- repository/
|   |   |-- auth.repo.ts
|   |-- shared/
|   |   |-- error/
|   |   |   |-- ApiError.ts
|   |   |   |-- globalError.ts
|   |-- types/
|   |   |-- express.d.ts
|   |-- utils/
|   |   |-- asyncHandler.ts
|   |   |-- generateToken.ts
|   |   |-- validRequest.ts
|   |-- validation/
|   |   |-- validationRule.ts
|   |-- app.ts
|-- server.ts
|-- tsconfig.json
|-- package.json
|-- .env.example
|-- .gitignore
|-- README.md
```

## Available Scripts

### Development

Run the development server with live reload via `tsx`:

```bash
npm run dev
```

### Type Checking

Verify types without compiling:

```bash
npm run typecheck
```

### Production Build

Compile TypeScript to JavaScript in `dist/`:

```bash
npm run build
```

### Start Production Server

Run the compiled JavaScript output:

```bash
npm start
```

## Architecture Overview

### Entry Point

`server.ts` starts the application. It connects to MongoDB first, then creates the Express app and starts listening on the configured port (`env.PORT`).

### App Setup

`src/app.ts` creates the Express app, registers global middleware, registers API routes, and attaches the global error handler.

### Config

`src/config/env.ts` loads `.env` values and validates them with Zod. If any required variable is missing, it exits safely with a descriptive log without exposing secret values.

`src/config/logger.ts` creates a Pino logger used by the app for structured logs.

### Database

`src/database/db.ts` connects to MongoDB using the configured `MONGO_URL`.

### Middleware

`security.middleware.ts` applies common production middleware:

- `helmet` for secure HTTP headers.
- `hpp` for HTTP parameter pollution protection.
- `cors` with credentials support.
- `express-rate-limit` for basic rate limiting.
- `compression` for compressed responses.
- `cookie-parser` for reading cookies.
- `morgan` for request logs.
- `passport.initialize()` for OAuth support.

`errorHandler.middleware.ts` sends a consistent JSON error response with appropriate status codes.

`googleOauth.middleware.ts` configures Google OAuth strategy.

### Auth Module

The auth module follows a layered structure:

- `auth.route.ts` defines the auth endpoints with request validation and async error handling.
- `auth.controller.ts` handles HTTP request and response logic.
- `auth.service.ts` contains business logic and token management.
- `auth.repo.ts` handles database operations via Mongoose.
- `auth.model.ts` defines the user schema with TypeScript types (`IUser`, `UserDocument`, `UserModel`).

### Shared Errors

`src/shared/error/` contains reusable error classes (`ApiError`, `NOTFOUNDERROR`, `UNAUTHORIZED`, `ALLREADYEXIST`) so services can throw meaningful errors and the global error handler can return proper responses.

### Utilities

`asyncHandler.ts` wraps async controllers and forwards thrown errors to Express.

`generateToken.ts` creates JWT access and refresh tokens.

`validRequest.ts` converts express-validator results into a clean validation error response.

### Validation

`validationRule.ts` defines request validation rules for registration, login, and student-style request data.

## Included API Routes

Base route:

```txt
/api/user
```

Available auth routes:

```txt
POST /api/user/register
POST /api/user/login
GET  /api/user/google
GET  /api/user/google/callback
POST /api/user/forgot_password
GET  /api/user/reset-password/:token
POST /api/user/update-password/:id
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/your_database
GOOGLE_CALLBACK_URL=http://localhost:3000/api/user/google/callback
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ACCESSTOKEN=your_access_token_secret
REFRESHTOKEN=your_refresh_token_secret
```

## License

MIT
