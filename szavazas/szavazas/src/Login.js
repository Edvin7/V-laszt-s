import React, { useState } from 'react';
import './loginform.css';  // Ez a stílus fájl az alkalmazásod CSS fájljához kapcsolódik
import loginImage from './images/loginregister.png';  // Kép importálása

function Login() {
  // Állapotok a form mezőihez
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Bejelentkezési függvény
  const handleLogin = (e) => {
    e.preventDefault();
    // Itt tudod a bejelentkezést kezelni, például API hívással
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
  };

  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              {/* Kép megjelenítése az importált változóval */}
              <img src={loginImage} alt="login illustration" />
            </figure>
            <a href="/register" className="signup-image-link">Nincs még fiókom</a>
            <br />
            <a href="/" className="signup-image-link kezdolap">Kezdőlap</a>
          </div>

          <div className="signin-form flex">
            <h2 className="form-title">Bejelentkezés</h2>
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
              <div className="form-group">
               
                
                
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
