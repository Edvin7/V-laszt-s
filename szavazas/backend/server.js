const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // bcrypt importálása

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // JSON kérések kezelése

// MySQL kapcsolat beállítása
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // a MySQL felhasználó neve
  password: '', // a MySQL jelszó
  database: 'vote', // az adatbázis neve
});

db.connect((err) => {
  if (err) {
    console.error('Hiba a MySQL kapcsolódás során:', err);
    return;
  }
  console.log('Sikeresen csatlakoztunk a MySQL adatbázishoz');
});

// Regisztrációs endpoint
app.post('/register', (req, res) => {
  const { name, email, pass, personal_id, agreeTerm } = req.body;

  // Ellenőrizzük, hogy minden mező megvan-e
  if (!name || !email || !pass || !personal_id || agreeTerm === undefined) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  //a felhasználó létezik-e már
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error('Hiba a felhasználó ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Belső hiba történt' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van' });
    }

    //hozzáadjuk az új felhasználót az adatbázisba
    const insertQuery = `INSERT INTO users (name, email, password_hash, personal_id, agree_terms, status) 
                         VALUES (?, ?, ?, ?, ?, 'active')`;

    //jelszót biztonságosan kell hash-elnünk
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

// Bejelentkezés végpont
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Ellenőrizzük, hogy létezik-e a felhasználó a megadott email címmel
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Hiba történt a lekérdezés során:', err);
      return res.status(500).json({ message: 'Belső hiba történt!' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
    }

    const user = results[0];

    // bcrypt jelszó ellenőrzés
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error('Hiba a jelszó ellenőrzésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
      }

      // Sikeres bejelentkezés
      res.status(200).json({
        message: 'Sikeres bejelentkezés',
        user: {
          id: user.id_number,
          name: user.name,
          email: user.email,
        },
      });
    });
  });
});

// Új endpoint a pártok adatainak lekérésére
app.get('/parties', (req, res) => {
    const query = 'SELECT * FROM parties'; 
    db.query(query, (err, results) => {
      if (err) {
        console.error('Hiba történt a pártok lekérésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }
  
      res.status(200).json(results); // Visszaadjuk a pártok adatait
    });
  });

  app.get('/api/parties', (req, res) => {
    const query = 'SELECT * FROM parties';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query failed' });
        return;
      }
      res.json(results);  // Visszaadja a pártok adatait JSON-ban
    });
  });
 
  

  app.get('/voting', (req, res) => {
    const query = 'SELECT * FROM parties';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Hiba történt a pártok lekérésekor:', err);
        return res.status(500).json({ message: 'Belső hiba történt' });
      }
      res.json(results); // JSON válasz küldése
    });
  });
  
  
  
  



// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});