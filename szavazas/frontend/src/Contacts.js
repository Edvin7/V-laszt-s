import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_mk48q3j',
      'template_rx0d99h',
      e.target,
      'xvGvzwHl7rO8HmBIK'
    )
    .then((result) => {
      alert('Email successfully sent!');
      console.log(result.text);
    })
    .catch((error) => {
      alert('An error occurred while sending the email!');
      console.log(error.text);
    });
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-wrapper">
        <h2 className="contact-form-header">Kapcsolat felvétel</h2>
        <p className="contact-form-subheader">Ha valami hibát észlel, vagy üzenetet szeretne küldeni itt tudja megtenni.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-group">
            <input
              type="text"
              name="name"
              placeholder="Teljes név"
              value={formData.name}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
          <div className="contact-form-group">
            <input
              type="email"
              name="email"
              placeholder="Email cím"
              value={formData.email}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
          
          <div className="contact-form-group">
            <textarea
              name="message"
              placeholder="Üzenet"
              value={formData.message}
              onChange={handleChange}
              className="contact-form-textarea"
              required
            />
          </div>
          <button type="submit" className="contact-form-submit">Küldés</button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
