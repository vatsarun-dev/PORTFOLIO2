/**
 * Email template generators.
 * Plain TypeScript functions generating secure, responsive HTML and plain text email content.
 */

export interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

/**
 * Escapes unsafe HTML characters to prevent XSS in email clients.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generates password reset email content.
 */
export function generatePasswordResetMail(
  name: string,
  resetLink: string,
): EmailContent {
  const safeName = escapeHtml(name || "User");
  const safeLink = escapeHtml(resetLink);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #141517; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 580px; margin: 40px auto; background-color: #1c1d20; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); padding: 32px; }
    .header { text-align: center; margin-bottom: 24px; }
    .header h1 { font-size: 24px; color: #ffffff; margin: 0; font-weight: 500; }
    .content p { font-size: 15px; line-height: 1.6; color: #e9eaeb; margin-bottom: 20px; }
    .btn-wrap { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background-color: #455ce9; color: #ffffff !important; text-decoration: none; padding: 12px 30px; border-radius: 24px; font-weight: 600; font-size: 15px; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #999d9e; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 16px; }
    .security-notice { font-size: 13px; color: #999d9e; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hello ${safeName},</p>
      <p>We received a request to reset the password for your account. Click the button below to proceed:</p>
      <div class="btn-wrap">
        <a href="${safeLink}" class="btn" target="_blank" rel="noopener noreferrer">Reset Password</a>
      </div>
      <p class="security-notice">If you did not request this password reset, please ignore this email. This link will expire shortly for security.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Arun Vats Portfolio Systems. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Hello ${name || "User"},

We received a request to reset the password for your account.
To reset your password, visit the following link:
${resetLink}

If you did not request this password reset, you can safely ignore this email.

© ${new Date().getFullYear()} Arun Vats Portfolio Systems.
  `.trim();

  return {
    subject: "Reset Your Password",
    html,
    text,
  };
}

/**
 * Generates general notification / contact email content.
 */
export function generateNotificationMail(
  subject: string,
  title: string,
  message: string,
  name?: string,
): EmailContent {
  const safeName = escapeHtml(name || "User");
  const safeTitle = escapeHtml(title);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #141517; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 580px; margin: 40px auto; background-color: #1c1d20; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); padding: 32px; }
    .header h2 { font-size: 22px; color: #ffffff; margin: 0 0 16px 0; font-weight: 500; }
    .content p { font-size: 15px; line-height: 1.6; color: #e9eaeb; margin-bottom: 16px; }
    .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #999d9e; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${safeTitle}</h2>
    </div>
    <div class="content">
      <p>Hello ${safeName},</p>
      <p>${safeMessage}</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Arun Vats Portfolio Systems.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Hello ${name || "User"},

${title}
----------------------------------------
${message}

© ${new Date().getFullYear()} Arun Vats Portfolio Systems.
  `.trim();

  return {
    subject,
    html,
    text,
  };
}

/**
 * Backward-compatible helper matching original draft signature in auth.service.ts
 */
export default function tempMail(name: string, link: string): string {
  return generatePasswordResetMail(name, link).html;
}
