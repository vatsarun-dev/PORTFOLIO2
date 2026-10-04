import apiClient from '../../../shared/services/apiClient';

/**
 * Contact Service Layer
 * Manages message dispatch, validation, honeypot traps, and backend SMTP communication.
 */
export const contactService = {
  submitMessage: async (formData) => {
    // 1. Honeypot check for spam bots
    const honeypot = formData.get('tel');
    if (honeypot) {
      return {
        success: true,
        message: 'Thank You',
        isBot: true,
      };
    }

    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const company = formData.get('company') || 'N/A';
    const service = formData.get('service') || 'General Inquiry';
    const clientMessage = formData.get('message') || '';

    // Format professional inquiry subject and body for the portfolio owner
    const subject = `[Portfolio Inquiry] ${service} - from ${name}`;
    const formattedMessage = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Service Requested: ${service}`,
      ``,
      `Message:`,
      clientMessage,
    ].join('\n');

    const payload = {
      name,
      replyTo: email,
      subject,
      message: formattedMessage,
    };

    // 2. Real dispatch to backend API (/api/mail/send)
    const response = await apiClient.post('/api/mail/send', payload);

    return {
      success: true,
      data: response.data,
      message:
        response.message ||
        'Thank you! Your message has been sent successfully. I will get back to you shortly.',
    };
  },
};

export default contactService;

