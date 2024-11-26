import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate importálása
import './Login.css';
import loginImage from './images/loginregister.png';
import axios from 'axios'; // Axios importálása



// Beállítjuk, hogy az Axios minden kéréshez küldje a cookie-t
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // Hibaüzenet tárolása
  const navigate = useNavigate(); // useNavigate hook használata

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Küldjük el a bejelentkezési adatokat a szervernek
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log('Bejelentkezés sikeres:', response.data);
      
      // Ha sikeres a bejelentkezés, átirányítjuk az App.js oldalra
      navigate('/'); // Az '/' az alapértelmezett kezdőlapra irányítja a felhasználót
    } catch (error) {
      // Hibakezelés és a hibaüzenet beállítása
      console.error('Hiba a bejelentkezés során:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Ismeretlen hiba történt');
    }
  };

  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src={loginImage} alt="login logo" />
            </figure>
            <Link to="/register" className="signup-image-link">Nincs még fiókom</Link>
            <br />
            <Link to="/" className="signup-image-link kezdolap">Kezdőlap</Link>
          </div>

          <div className="signin-form flex">
            <h2 className="form-title">Bejelentkezés</h2>
            {/* Hibaüzenet megjelenítése, ha van */}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="register-form" id="login-form">
              <div className="form-group">
                <label htmlFor="your_name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="your_name"
                  id="your_name"
                  placeholder="Email cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="your_pass">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="your_pass"
                  id="your_pass"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group form-button">
                <input type="submit" name="signin" id="signin" className="form-submit" value="Bejelentkezés" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
