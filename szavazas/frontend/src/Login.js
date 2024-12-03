import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import loginImage from './images/loginregister.png';


// Beállítjuk, hogy az Axios minden kéréshez küldje a cookie-t
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';


function Login({ setIsLoggedIn }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const user = localStorage.getItem('user');
      if (user && user !== '0') {
        setIsLoggedIn(true); 
        navigate('/'); 
      } else {
        setError('Bejelentkezés nem sikerült. Kérlek, próbáld újra!');
      }
    } catch (error) {
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
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin} className="register-form" id="login-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group form-button">
                <input type="submit" value="Bejelentkezés" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
