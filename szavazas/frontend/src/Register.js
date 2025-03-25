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

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Név mező esetén csak betűk engedélyezése
    if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Csak betűk és szóközök engedélyezettek
    }

    // Adószám esetén csak számok engedélyezettek és maximum 8 karakter
    if (name === 'personal_id' && !/^\d{0,8}$/.test(value)) {
      return; // Csak számok és maximum 8 karakter
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Email validáció (egyszerű regex)
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Adószám validáció (maximum 8 számjegy)
  const validatePersonalId = (id) => {
    const personalIdRegex = /^\d{1,8}$/; // maximum 8 számjegy
    return personalIdRegex.test(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Alapértelmezett hibaüzenet törlés

    // Ellenőrzések
    if (!validateEmail(formData.email)) {
      setError('Hibás email formátum!');
      setTimeout(() => setError(''), 5000); // 5 másodperc után eltűnik
      return;
    }

    if (formData.pass !== formData.re_pass) {
      setError('A jelszavak nem egyeznek!');
      setTimeout(() => setError(''), 5000); // 5 másodperc után eltűnik
      return;
    }

    if (!validatePersonalId(formData.personal_id)) {
      setError('Az adószámnak legfeljebb 8 számjegyűnek kell lennie!');
      setTimeout(() => setError(''), 5000); // 5 másodperc után eltűnik
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

      // Ha a regisztráció sikeres, átirányítjuk a bejelentkezési oldalra
      setTimeout(() => {
        navigate('/login'); 
      }, 1000);

    } catch (error) {
      console.error('Hiba történt a regisztráció során:', error);
      setError('Ismeretlen hiba történt. Kérjük próbálja újra!');
      setTimeout(() => setError(''), 5000); // 5 másodperc után eltűnik
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Regisztráció</h2>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
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
                  placeholder="Adószám"
                  value={formData.personal_id}
                  onChange={handleChange}
                  maxLength={8} // Maximum 8 karakter
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
