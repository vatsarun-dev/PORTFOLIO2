import React from 'react';
import { useContact } from '../hooks/useContact';
import { ContactHeader } from '../components/ContactHeader';
import { ContactForm } from '../components/ContactForm';
import { ContactDetails } from '../components/ContactDetails';
import { ContactFooter } from '../components/ContactFooter';
import { AUTHOR_INFO } from '../../../shared/constants/authorInfo';

export const ContactPage = () => {
  const { status, feedback, handleSubmit } = useContact();

  return (
    <div className="main-wrap" id="contact">
      <header className="section default-header contact-header theme-dark">
        <div className="container medium">
          <ContactHeader />
          <div className="row once-in contact-main-row">
            <div className="flex-col contact-form-wrapper">
              <ContactForm
                status={status}
                feedback={feedback}
                onSubmit={handleSubmit}
              />
            </div>
            <ContactDetails authorInfo={AUTHOR_INFO} />
          </div>
        </div>
      </header>
      <ContactFooter socials={AUTHOR_INFO.socials} />
    </div>
  );
};

export default ContactPage;
