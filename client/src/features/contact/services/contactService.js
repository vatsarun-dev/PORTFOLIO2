/**
 * Contact Service Layer
 * Manages message dispatch, validation, honeypot traps, and feedback responses.
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

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      service: formData.get('service'),
      message: formData.get('message'),
    };

    // 2. Simulated async dispatch (or production endpoint integration)
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      data: payload,
      message:
        'Thank You! Message prepared. Feel free to connect directly on LinkedIn or GitHub as well.',
    };
  },
};

export default contactService;
