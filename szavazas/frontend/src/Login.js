import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate importálása
import './Login.css';
import loginImage from './images/loginregister.png'; // A login kép
import axios from 'axios'; // Axios importálása

function Login() {
  const [email, setEmail] = useState(''); // Email állapot
  const [password, setPassword] = useState(''); // Jelszó állapot
  const [rememberMe, setRememberMe] = useState(false); // Emlékezés checkbox állapot
  const [error, setError] = useState(''); // Hibaüzenet állapot
  const navigate = useNavigate(); // useNavigate hook

  // Bejelentkezési folyamat
  const handleLogin = async (e) => {
    e.preventDefault(); // Alapértelmezett űrlap elküldési viselkedés megakadályozása

    try {
      // Backend API hívás bejelentkezéshez
      const response = await axios.post('http://localhost:5000/login', { email, password });

      console.log('Bejelentkezés sikeres:', response.data);

      // A bejelentkezés után elmentjük a felhasználói adatokat localStorage-ba
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Ellenőrizzük, hogy a user adat nem 0, vagy üres
      const user = localStorage.getItem('user');
      if (user && user !== '0') {
        // Ha a user nem 0 vagy üres, átirányítjuk a kezdőlapra
        navigate('/');
      } else {
        setError('Bejelentkezés nem sikerült. Kérlek, próbáld újra!');
      }
    } catch (error) {
      console.error('Hiba a bejelentkezés során:', error.response?.data || error.message);
      // Hibaüzenet megjelenítése
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
                  onChange={(e) => setEmail(e.target.value)} // Az email állapot frissítése
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
                  onChange={(e) => setPassword(e.target.value)} // A jelszó állapot frissítése
                />
              </div>

              {/* Emlékezz rám checkbox */}
              <div className="form-group">
                <label htmlFor="remember-me" className="remember-me">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)} // Az emlékezés checkbox kezelése
                  />
                  Emlékezz rám
                </label>
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
