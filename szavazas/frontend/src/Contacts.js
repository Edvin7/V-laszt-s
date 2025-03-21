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

  const [statusMessage, setStatusMessage] = useState('');  
  const [statusType, setStatusType] = useState(''); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_okj43zh',
      'template_y283u9i',
      e.target,
      'e23gZwKPhdYed1RRP'
    )
    .then((result) => {
      setStatusMessage('Email sikeresen elküldve!');
      setStatusType('success');  
      console.log(result.text);
      setTimeout(() => {
        setStatusMessage(''); 
      }, 3000);
    })
    .catch((error) => {
      setStatusMessage('Hiba történt az email küldése közben. Kérlek próbáld újra!');
      setStatusType('error');  
      console.log(error.text);
      setTimeout(() => {
        setStatusMessage('');  
      }, 3000);
    });
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-wrapper">
        <h2 className="contact-form-header">Kapcsolat <span style={{ color: '#033473' }}>felvétel</span></h2>
        <div className="line-above"></div>
        <p className="contact-form-subheader">Ha valami hibát észlel, vagy üzenetet szeretne küldeni itt tudja megtenni.</p>

        {statusMessage && (
          <div className={`status-message ${statusType}`}>
            {statusMessage}
          </div>
        )}

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
