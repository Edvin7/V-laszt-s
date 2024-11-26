const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // JWT könyvtár

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // A frontend URL-je
  credentials: true, // Cookie-k átadása
}));
app.use(bodyParser.json()); // JSON kéréskezelés
app.use(cookieParser()); // Cookie-k kezelése

// MySQL kapcsolat
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // a MySQL jelszó
  database: 'vote', // az adatbázis neve
});

db.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódásakor:', err);
    return;
  }
  console.log('Sikeresen csatlakoztunk a MySQL adatbázishoz');
});

// Regisztrációs végpont
app.post('/register', (req, res) => {
  const { name, email, pass, personal_id, agreeTerm } = req.body;

  if (!name || !email || !pass || !personal_id || agreeTerm === undefined) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error('Hiba a felhasználó ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Belső hiba történt' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van' });
    }

    const insertQuery = `INSERT INTO users (name, email, password_hash, personal_id, agree_terms, status) 
                         VALUES (?, ?, ?, ?, ?, 'active')`;

    bcrypt.hash(pass, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Hiba a jelszó hash-elésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }

      db.query(insertQuery, [name, email, hashedPassword, personal_id, agreeTerm ? 1 : 0], (err, result) => {
        if (err) {
          console.error('Hiba a felhasználó hozzáadása közben:', err);
          return res.status(500).json({ message: 'Belső hiba történt' });
        }

        res.status(200).json({ message: 'Sikeres regisztráció!' });
      });
    });
  });
});

// Bejelentkezés endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Hiba történt a lekérdezés során:', err);
      return res.status(500).json({ message: 'Belső hiba történt!' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error('Hiba a jelszó ellenőrzésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
      }

      // JWT token létrehozása
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        'your-secret-key', // Titkos kulcs
        { expiresIn: '1h' } // 1 órás érvényesség
      );

      // A token küldése cookie-ként
      res.cookie('auth_token', token, {
        httpOnly: true, // A cookie csak szerver oldalról érhető el
        secure: false, // Lokális fejlesztéshez, ha HTTPS-t használsz, akkor 'true' kell
        maxAge: 24 * 60 * 60 * 1000, // 1 nap
        sameSite: 'strict', // Biztonságos cookie beállítás
      });

      res.status(200).json({
        message: 'Sikeres bejelentkezés',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  });
});

// Token ellenőrzése middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token; // A token a cookie-ból

  if (!token) {
    return res.status(401).json({ message: 'Nem vagy bejelentkezve!' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Hibás vagy lejárt token!' });
    }
    req.user = decoded; // A dekódolt információ tárolása a kérésben
    next();
  });
};

// Védett endpoint
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Védett adat', data: 'Ez egy titkos adat!' });
});

// Kijelentkezés (cookie törlés)
app.post('/logout', (req, res) => {
  res.clearCookie('auth_token');  // Töröljük az auth_token cookie-t
  res.status(200).json({ message: 'Sikeres kijelentkezés' });
});

// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});
