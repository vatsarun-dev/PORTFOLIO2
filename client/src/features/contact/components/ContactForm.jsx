import React from 'react';

/**
 * ContactForm component.
 * Renders honeypot field, 5 fields (name, email, company, service, message),
 * submit button, and feedback state banner.
 */
export const ContactForm = ({ status, feedback, onSubmit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (status === 'submitting') return;
    onSubmit(e.target);
  };

  return (
    <form className="form" id="contact-form" onSubmit={handleFormSubmit}>
      {/* Honeypot for spam bots */}
      <div className="website-field" style={{ display: 'none' }}>
        <label className="label" htmlFor="form-tel">
          Phone Number
        </label>
        <input className="field" type="text" id="form-tel" name="tel" tabIndex={-1} />
      </div>

      <div className="form-col">
        <h5>01</h5>
        <label className="label" htmlFor="form-name">
          What's your name?
        </label>
        <input
          className="field"
          type="text"
          id="form-name"
          name="name"
          required
          placeholder="John Doe *"
        />
      </div>

      <div className="form-col">
        <h5>02</h5>
        <label className="label" htmlFor="form-email">
          What's your email?
        </label>
        <input
          className="field"
          type="email"
          id="form-email"
          name="email"
          required
          placeholder="john@doe.com *"
        />
      </div>

      <div className="form-col">
        <h5>03</h5>
        <label className="label" htmlFor="form-company">
          What's the name of your organization?
        </label>
        <input
          className="field"
          type="text"
          id="form-company"
          name="company"
          placeholder="Company &amp; Co. ®"
        />
      </div>

      <div className="form-col">
        <h5>04</h5>
        <label className="label" htmlFor="form-service">
          What services are you looking for?
        </label>
        <input
          className="field"
          type="text"
          id="form-service"
          name="service"
          placeholder="Full Stack, Backend, AI Integration ..."
        />
      </div>

      <div className="form-col">
        <h5>05</h5>
        <label className="label" htmlFor="form-message">
          Your message
        </label>
        <textarea
          className="field"
          id="form-message"
          name="message"
          rows="8"
          required
          placeholder="Hello Arun, can you help me with ... *"
        ></textarea>
      </div>

      <div className="btn-contact-send">
        <div className="btn btn-round" data-scroll="true" data-scroll-speed="2">
          <div
            className="btn-click magnetic"
            data-strength="100"
            data-strength-text="50"
          >
            <div className="btn-fill"></div>
            <span className="btn-text">
              <span className="btn-text-inner">
                {status === 'submitting'
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Thank You'
                  : status === 'error'
                  ? 'Retry'
                  : 'Send it!'}
              </span>
            </span>
            <input
              type="submit"
              name="submit"
              value=""
              className="form-btn"
              disabled={status === 'submitting'}
            />
          </div>
        </div>
      </div>

      {feedback && (
        <div
          className="contact-feedback"
          style={{
            marginTop: '1.75rem',
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            backgroundColor:
              status === 'error'
                ? 'rgba(239, 68, 68, 0.12)'
                : 'rgba(34, 197, 94, 0.12)',
            border: `1px solid ${
              status === 'error'
                ? 'rgba(239, 68, 68, 0.3)'
                : 'rgba(34, 197, 94, 0.3)'
            }`,
            color: status === 'error' ? '#fca5a5' : '#86efac',
            transition: 'opacity 0.3s ease',
          }}
        >
          {feedback}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
