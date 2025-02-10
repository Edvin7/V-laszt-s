const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // bcrypt importálása

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // A frontend URL-je
  credentials: true, // A hitelesítéshez szükséges cookie-k engedélyezése
}));
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

  // Ellenőrizzük, hogy a felhasználó létezik-e már
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.error('Hiba a felhasználó ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Belső hiba történt' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van' });
    }

    // Ha nem létezik, hozzáadjuk az új felhasználót az adatbázisba
    const insertQuery = `INSERT INTO users (name, email, password_hash, personal_id, agree_terms, status) 
                         VALUES (?, ?, ?, ?, ?, 'active')`;

    // A jelszót biztonságosan kell hash-elnünk (bcrypt használatával)
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

// Bejelentkezett felhasználó ellenőrzése
app.get('/api/user', (req, res) => {
  if (req.session.user) {
    // Ha a session tartalmazza a felhasználó adatokat, akkor be van jelentkezve
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  }
  // Ha nincs bejelentkezett felhasználó
  res.status(200).json({ loggedIn: false });
});

// Szavazat leadása
app.post('/voting', (req, res) => {
  const { election_id, party_id, vote_hash, user_id } = req.body;

  // Ellenőrizzük, hogy minden szükséges adatot megadtak-e
  if (!election_id || !party_id || !vote_hash || !user_id) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  // Először ellenőrizzük, hogy a felhasználó már leadott-e szavazatot a választáson
  const checkVoteQuery = 'SELECT * FROM votes WHERE election_id = ? AND user_id = ?';
  db.query(checkVoteQuery, [election_id, user_id], (err, result) => {
    if (err) {
      console.error('Hiba történt a szavazat ellenőrzésekor:', err);
      return res.status(500).json({ message: 'Hiba történt a szavazat ellenőrzésekor!' });
    }

    // Ha találunk már egy szavazatot a felhasználó számára, akkor nem engedjük meg újra a szavazást
    if (result.length > 0) {
      return res.status(400).json({ message: 'Már leadtad a szavazatot!' });
    }

    // Ha még nincs szavazat, akkor rögzítjük a szavazatot
    const query = 'INSERT INTO votes (election_id, party_id, vote_hash, user_id) VALUES (?, ?, ?, ?)';
    db.query(query, [election_id, party_id, vote_hash, user_id], (err, result) => {
      if (err) {
        console.error('Hiba történt a szavazat mentésekor:', err);
        return res.status(500).json({ message: 'Hiba történt a szavazat leadásakor!' });
      }

      // Visszaadjuk a sikeres válasz üzenetet
      res.status(200).json({ message: 'Sikeresen leadta a szavazatot!' });
    });
  });
});



// Új endpoint a pártok adatainak lekérésére
app.get('/parties', (req, res) => {
    const query = 'SELECT * FROM parties'; // A parties tábla adatainak lekérése
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
  
  // API végpont a számok lekéréséhez
app.get('/counters', (req, res) => {
  // Adatok lekérdezése az adatbázisból
  const queries = {
    parties: 'SELECT COUNT(*) AS partyCount FROM parties', // Pártok száma
    users: 'SELECT COUNT(*) AS userCount FROM users',   // Felhasználók száma
    votes: 'SELECT COUNT(*) AS voteCount FROM votes', // Leadott szavazatok
  };

  // Lekérdezzük mindhárom értéket egyszerre
  const results = {};

  db.query(queries.parties, (err, partyResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Hiba történt a pártok számának lekérésekor.' });
    }
    results.parties = partyResults[0].partyCount;

    db.query(queries.users, (err, userResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Hiba történt a felhasználók számának lekérésekor.' });
      }
      results.users = userResults[0].userCount;

      db.query(queries.votes, (err, voteResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Hiba történt a leadott szavazatok számának lekérésekor.' });
        }
        results.votes = voteResults[0].voteCount;

        // Válasz küldése a frontend felé
        return res.json([
          { id: 1, icon: 'https://example.com/map-icon.png', value: results.parties, label: 'Pártok' },
          { id: 2, icon: 'https://example.com/speech-icon.png', value: results.users, label: 'Felhasználók' },
          { id: 3, icon: 'https://example.com/user-icon.png', value: results.votes, label: 'Leadtott Szavazatok' },
        ]);
      });
    });
  });
});




  
// API végpont a választási eredmények lekéréséhez
app.get('/election-results', (req, res) => {
  // SQL lekérdezés a pártokra leadott szavazatok összegzésére
  const  query = `
    SELECT p.party_id, p.name AS party_name, COUNT(v.vote_id) AS totalVotes
    FROM parties p
    LEFT JOIN votes v ON p.party_id = v.party_id
    GROUP BY p.party_id, p.name
    ORDER BY totalVotes DESC;
`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Hiba történt a pártokra leadott szavazatok lekérésekor.' });
    }

    // Adatok formázása és válaszként küldése
    return res.json(results.map((row) => ({
      party_id: row.party_id,
      party: row.party_name,
      votes: row.totalVotes
    })));
  });
});


// Get all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(result);
  });
});

// Update user info
app.put('/api/users/:id', (req, res) => {
  const { name, email, personal_id, status } = req.body;
  const userId = req.params.id;
  const query = 'UPDATE users SET name = ?, email = ?, personal_id = ?, status = ? WHERE id_number = ?';
  
  db.query(query, [name, email, personal_id, status, userId], (err, result) => {
    if (err) {
      res.status(500).send('Error updating user');
      return;
    }
    res.send('User updated');
  });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;  // A paraméterben kapott id
  const query = 'DELETE FROM users WHERE id_number = ?';  // SQL lekérdezés
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Hiba történt a felhasználó törlésekor:', err);
      return res.status(500).send('Hiba történt a törlés közben');
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Felhasználó nem található');
    }

    res.send('Felhasználó törölve');
  });
});

// Hozzáadás endpoint
app.post('/api/parties', (req, res) => {
  const { name, description } = req.body;

  db.query(
    'INSERT INTO parties (name, description, votes) VALUES (?, ?, 0)',
    [name, description],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true, message: 'Part hozzáadva' });
    }
  );
});

// Törlés endpoint
app.post('/api/parties', (req, res) => {
  const { name, description } = req.body;

  db.query(
    'INSERT INTO parties (name, description, votes) VALUES (?, ?, 0)',
    [name, description],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true, message: 'Part hozzáadva' });
    }
  );
});




// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});