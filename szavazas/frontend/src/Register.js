import React, { useState } from 'react';
import axios from 'axios'; 
import './Register.css';
import { Link, useNavigate } from 'react-router-dom'; 
import loginImage from './images/loginlogo.png'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    re_pass: '',
    personal_id: '',
    agreeTerm: false,
  });

  const navigate = useNavigate();  // Hozzáadjuk a navigate hook-ot

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.pass !== formData.re_pass) {
      alert('A jelszavak nem egyeznek!');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name: formData.name,
        email: formData.email,
        pass: formData.pass,
        personal_id: formData.personal_id,
        agreeTerm: formData.agreeTerm,
      });
  
      console.log('Regisztráció sikeres:', response.data);
      setFormData({ ...formData, message: response.data.message });
  
      // Ha a regisztráció sikeres, átirányítjuk a bejelentkezési oldalra
      setTimeout(() => {
        navigate('/login');  // 3 másodperc múlva átirányítás
      }, 1000);
  
    } catch (error) {
      if (error.response) {
        console.error('Hiba történt a regisztráció során:', error.response.data);
        alert(`Hiba: ${error.response.data.message || 'Ismeretlen hiba történt.'}`);
      } else if (error.request) {
        console.error('A kérés nem érkezett vissza:', error.request);
        alert('A kérés nem érkezett vissza. Ellenőrizd a szerver elérhetőségét!');
      } else {
        console.error('Hiba történt a kérés küldése közben:', error.message);
        alert(`Hiba: ${error.message}`);
      }
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Regisztráció</h2>
            {formData.message && <p>{formData.message}</p>}
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
            <Link to="/login" className="signup-image-link">Már van fiókom</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
