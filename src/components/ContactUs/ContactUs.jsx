import { useState } from 'react';
import './ContactUs.css';
import '../../fonts.css';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false,
    isSubmitting: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ message: '', isError: false, isSubmitting: true });
    
    try {
      // Send the form data using EmailJS
      const templateParams = {
        to_email: 'contato@forasteira.com.br',
        from_name: formData.name,
        from_email: formData.email,
        message: `Contact form submission from ${formData.name} (${formData.email})`
      };
      
      await emailjs.send(
        'service_t16d9ct',  // Replace with your EmailJS service ID
        'template_ptrcoyd', // Replace with your EmailJS template ID
        templateParams,
        'qzbHmsO8fpWPXRsjO'   // Replace with your EmailJS public key
      );

      // Clear the form and show success message
      setFormData({ name: '', email: '' });
      setSubmitStatus({ 
        message: 'Message sent successfully!', 
        isError: false,
        isSubmitting: false
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({ 
        message: 'Failed to send message. Please try again later.', 
        isError: true,
        isSubmitting: false
      });
    }
  };

  return (
    <div className="contact-section">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input">
          <div className="form-field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button 
          className="submit" 
          type="submit" 
          disabled={submitStatus.isSubmitting}
        >
          <img className='starburst' src="/send-icon-form.svg" width={128} alt="" />
          <span>{submitStatus.isSubmitting ? 'Enviando' : 'Enviar'}</span>
        </button>
        
        {submitStatus.message && (
          <div className={`status-message ${submitStatus.isError ? 'error' : 'success'}`}>
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
}