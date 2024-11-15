import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importáld a Link komponenst
import './Register.css';
import loginImage from './images/loginregister.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    re_pass: '',
    personal_id: '',
    agreeTerm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pass !== formData.re_pass) {
      alert('A jelszavak nem egyeznek!');
      return;
    }
    console.log('Form Data:', formData);
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Regisztráció</h2>
            <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Teljes név"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email cím"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder="Jelszó"
                  value={formData.pass}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="re_pass"><i className="zmdi zmdi-lock-outline"></i></label>
                <input
                  type="password"
                  name="re_pass"
                  id="re_pass"
                  placeholder="Ismételje meg a jelszavát"
                  value={formData.re_pass}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="personal_id"><i className="zmdi zmdi-card"></i></label>
                <input
                  type="text"
                  name="personal_id"
                  id="personal_id"
                  placeholder="Személyi ig. szám"
                  value={formData.personal_id}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="agreeTerm"
                  id="agree-term"
                  className="agree-term"
                  checked={formData.agreeTerm}
                  onChange={handleChange}
                />
                <label htmlFor="agree-term" className="label-agree-term">
                  <span><span></span></span>Elfogadom az <a href="#" className="term-service">Általános Szerződési Feltételeket</a>
                </label>
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Regisztráció"
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure><img src={loginImage} alt="login logo" /></figure>
            {/* Itt is Link-et használj */}
            <Link to="/login" className="signup-image-link">Már van fiókom</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
