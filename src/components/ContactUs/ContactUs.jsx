import { useState } from 'react';
import './ContactUs.css';
import '../../fonts.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-section">
      <form onSubmit={handleSubmit} className="contact-form">
    <div className="input">
    <div className="form-field">
    <label htmlFor="name" >Nome</label>
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
        <button className="submit" type="submit">
        <img className='starburst' src="/send-icon-form.svg" width={128} alt="" />
          <span>Enviar</span>
        </button>
      </form>
    </div>
  );
}
