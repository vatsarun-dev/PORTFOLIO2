/**
 * Contact form validation utilities
 */

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateContactForm(formData) {
  const errors = {};

  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name) {
    errors.name = 'Please provide your name.';
  }

  if (!email) {
    errors.email = 'Please provide your email address.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter your message.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
