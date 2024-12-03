import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Kovács János",
    email: "janos.kovacs@email.com",
    phone: "+36 30 123 4567",
    address: "Budapest, Fő utca 12.",
  });

  // Profilkép állapota
  const [profilePic, setProfilePic] = useState(null);

  // Jelszó változtatás állapotai
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Jelszó változtatás kezelése
  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("A két jelszó nem egyezik.");
    } else {
      setPasswordError("");
      alert('A jelszó sikeresen megváltozott!');
    }
  };

  // Profilkép módosítás
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // A képet base64 formátumban tároljuk
      };
      reader.readAsDataURL(file); // Fájl olvasása base64 formátumban
    }
  };

  return (
    <div className="account-container">
      <h1>Fiók információ</h1>

      {/* Profilkép szekció */}
      <div className="profile-pic-section">
        <div className="profile-pic-container">
          {profilePic ? (
            <img src={profilePic} alt="Profilkép" className="profile-pic" />
          ) : (
            <div className="default-profile-pic">Nincs kép</div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="file-input"
        />
      </div>

      {/* Felhasználói információk */}
      <div className="user-info">
        <p><strong>Neved:</strong> {userInfo.name}</p>
        <p><strong>Email cím:</strong> {userInfo.email}</p>
        <p><strong>Telefonszám:</strong> {userInfo.phone}</p>
        <p><strong>Cím:</strong> {userInfo.address}</p>
      </div>

      {/* Jelszó változtatás */}
      <div className="password-change-section">
        <h2>Jelszó változtatás</h2>
        <div className="input-group">
          <div className="password-input-container">
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              id="new-password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Írj be új jelszót"
            />
            <span 
              className="eye-icon" 
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        <div className="input-group">
          <div className="password-input-container">
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              id="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Írd be újra a jelszót"
            />
            <span 
              className="eye-icon" 
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        {passwordError && <p className="error">{passwordError}</p>}
        <button className="change-password-btn" onClick={handlePasswordChange}>Jelszó változtatás</button>
      </div>
    </div>
  );
};

export default Account;
