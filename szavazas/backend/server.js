const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();

// Middleware
app.use(cors({
  origin: ['https://szavazz.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Database connection test
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1 + 1 AS result');
    res.status(200).json({ success: true, result: result.rows[0].result });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, pass, personal_id, agreeTerm } = req.body;

  if (!name || !email || !pass || !personal_id || agreeTerm === undefined) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  try {
    // Check if email exists
    const checkResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'Ez az email már regisztrálva van' });
    }

    // Hash password and insert user
    const hashedPassword = await bcrypt.hash(pass, 10);
    const insertResult = await pool.query(
      `INSERT INTO users (name, email, password_hash, personal_id, agree_terms, status) 
       VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`,
      [name, email, hashedPassword, personal_id, agreeTerm ? true : false]
    );

    res.status(200).json({ message: 'Sikeres regisztráció!' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Belső hiba történt' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check users table first
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
      }

      return res.status(200).json({
        message: 'Sikeres bejelentkezés',
        user: {
          id: user.id_number,
          name: user.name,
          email: user.email,
          isAdmin: false,
        },
      });
    }

    // If not found in users, check admin table
    const adminResult = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
    
    if (adminResult.rows.length === 0) {
      return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
    }

    const admin = adminResult.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Helytelen email vagy jelszó' });
    }

    return res.status(200).json({
      message: 'Sikeres bejelentkezés',
      user: {
        id: admin.admin_id,
        name: admin.name,
        email: admin.email,
        isAdmin: true,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Belső hiba történt' });
  }
});

// Voting endpoint
app.post('/voting', async (req, res) => {
  const { election_id, party_id, vote_hash, user_id } = req.body;

  if (!election_id || !party_id || !vote_hash || !user_id) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  try {
    // Check if user already voted
    const voteCheck = await pool.query(
      'SELECT * FROM votes WHERE election_id = $1 AND user_id = $2',
      [election_id, user_id]
    );

    if (voteCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Már leadtad a szavazatot!' });
    }

    // Insert vote
    await pool.query(
      'INSERT INTO votes (election_id, party_id, vote_hash, user_id) VALUES ($1, $2, $3, $4)',
      [election_id, party_id, vote_hash, user_id]
    );

    res.status(200).json({ message: 'Sikeresen leadta a szavazatot!' });
  } catch (err) {
    console.error('Voting error:', err);
    res.status(500).json({ message: 'Hiba történt a szavazat leadásakor!' });
  }
});

// Get parties
app.get('/parties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parties');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Parties query error:', err);
    res.status(500).json({ message: 'Belső hiba történt' });
  }
});

// Get counters
app.get('/counters', async (req, res) => {
  try {
    const parties = await pool.query('SELECT COUNT(*) AS party_count FROM parties');
    const users = await pool.query('SELECT COUNT(*) AS user_count FROM users');
    const votes = await pool.query('SELECT COUNT(*) AS vote_count FROM votes');

    res.json([
      { 
        id: 1, 
        icon: 'https://cdn.jsdelivr.net/gh/Edvin7/V-laszt-s/szavazas/frontend/public/icons/campaign.png', 
        value: parseInt(parties.rows[0].party_count), 
        label: 'Pártok' 
      },
      { 
        id: 2, 
        icon: 'https://cdn.jsdelivr.net/gh/Edvin7/V-laszt-s/szavazas/frontend/public/icons/friend.png', 
        value: parseInt(users.rows[0].user_count), 
        label: 'Felhasználók' 
      },
      { 
        id: 3, 
        icon: 'https://cdn.jsdelivr.net/gh/Edvin7/V-laszt-s/szavazas/frontend/public/icons/vote.png', 
        value: parseInt(votes.rows[0].vote_count), 
        label: 'Leadott Szavazatok' 
      },
    ]);
  } catch (err) {
    console.error('Counters error:', err);
    res.status(500).json({ error: 'Hiba történt a számok lekérésekor.' });
  }
});

// Get election results
app.get('/election-results', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.party_id, p.name AS party_name, COUNT(v.vote_id) AS total_votes
      FROM parties p
      LEFT JOIN votes v ON p.party_id = v.party_id
      GROUP BY p.party_id, p.name
      ORDER BY total_votes DESC;
    `);

    res.json(result.rows.map(row => ({
      party_id: row.party_id,
      party: row.party_name,
      votes: parseInt(row.total_votes)
    })));
  } catch (err) {
    console.error('Election results error:', err);
    res.status(500).json({ error: 'Hiba történt az eredmények lekérésekor.' });
  }
});

// Get users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Users query error:', err);
    res.status(500).send('Error fetching users');
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  const { name, email, personal_id, status } = req.body;
  const userId = req.params.id;

  try {
    await pool.query(
      'UPDATE users SET name = $1, email = $2, personal_id = $3, status = $4 WHERE id_number = $5',
      [name, email, personal_id, status, userId]
    );
    res.send('User updated');
  } catch (err) {
    console.error('User update error:', err);
    res.status(500).send('Error updating user');
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM users WHERE id_number = $1 RETURNING *', [userId]);
    
    if (result.rowCount === 0) {
      return res.status(404).send('Felhasználó nem található');
    }

    res.send('Felhasználó törölve');
  } catch (err) {
    console.error('User delete error:', err);
    
    if (err.code === '23503') { // Foreign key violation
      return res.status(400).json({
        error: 'A felhasználó nem törölhető, mert jelenleg futó szavazásban részt vett.',
        details: 'A felhasználóhoz kapcsolódó rekordok találhatók más táblákban, így törlése nem lehetséges.'
      });
    }

    res.status(500).send('Hiba történt a törlés közben');
  }
});

// File upload setup
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Add new party with photo upload
app.post('/api/parties', upload.single('photo'), async (req, res) => {
  const { name, description, political_ideology, political_campaign_description, political_year_description } = req.body;
  const photo = req.file ? req.file.filename : null;

  if (!name || !description || !political_ideology || !political_campaign_description || !political_year_description) {
    return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
  }

  try {
    // Check timer
    const timerResult = await pool.query('SELECT countdown_date FROM settings LIMIT 1');
    
    if (timerResult.rows.length > 0) {
      const countdownDate = timerResult.rows[0].countdown_date;
      if (countdownDate && new Date(countdownDate) > new Date()) {
        return res.status(403).json({ error: 'Új párt csak az időzítő lejárta után tölthető fel!' });
      }
    }

    // Insert new party
    await pool.query(
      `INSERT INTO parties 
      (name, description, photo, political_ideology, political_campaign_description, political_year_description) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, description, photo, political_ideology, political_campaign_description, political_year_description]
    );

    res.status(201).json({ success: true, message: 'Párt sikeresen hozzáadva!' });
  } catch (err) {
    console.error('Add party error:', err);
    res.status(500).json({ error: 'Hiba történt az adatbázis művelet során.' });
  }
});

// Delete party
app.delete('/api/parties/:id', async (req, res) => {
  const partyId = parseInt(req.params.id);

  if (isNaN(partyId)) {
    return res.status(400).json({ error: 'Érvénytelen ID' });
  }

  try {
    const result = await pool.query('DELETE FROM parties WHERE party_id = $1 RETURNING *', [partyId]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Nem található a párt.' });
    }
    
    res.json({ success: true, message: 'Párt sikeresen törölve' });
  } catch (err) {
    console.error('Delete party error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get privacy terms
app.get('/api/privacyTerms', async (req, res) => {
  try {
    const result = await pool.query('SELECT content FROM privacy_terms WHERE id = 1');
    res.json({ privacyTerms: result.rows[0].content });
  } catch (err) {
    console.error('Privacy terms error:', err);
    res.status(500).send('Hiba történt az adatbázis lekérdezésekor');
  }
});

// Get countdown date
app.get('/api/countdown-date', async (req, res) => {
  try {
    const result = await pool.query('SELECT countdown_date FROM settings LIMIT 1');
    
    if (result.rows.length > 0) {
      res.json({ countdownDate: result.rows[0].countdown_date });
    } else {
      res.status(404).json({ error: 'Countdown date not found' });
    }
  } catch (err) {
    console.error('Countdown date error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update countdown date
app.post('/api/date-plus', async (req, res) => {
  const { countdownDate } = req.body;

  if (!countdownDate) {
    return res.status(400).json({ error: 'A név és a leírás kötelező mezők!' });
  }

  const date = new Date(countdownDate);
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  try {
    await pool.query('UPDATE settings SET countdown_date = $1 WHERE id = 1', [countdownDate]);
    res.json({ message: 'Countdown date updated successfully' });
  } catch (err) {
    console.error('Update countdown error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Check voting status
app.get('/api/is-voting-active', async (req, res) => {
  try {
    const result = await pool.query('SELECT countdown_date FROM settings WHERE id = 1');
    
    if (result.rows.length > 0) {
      const countdownDate = result.rows[0].countdown_date;

      if (!countdownDate || countdownDate === '0000-00-00 00:00:00') {
        return res.json({ isActive: false });
      }

      const countdownDateObj = new Date(countdownDate);
      const now = new Date();

      if (countdownDateObj <= now) {
        return res.json({ isActive: false });
      }
      return res.json({ isActive: true });
    } else {
      res.status(404).json({ error: 'Countdown date not found' });
    }
  } catch (err) {
    console.error('Voting status error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Reset countdown
app.post('/api/reset-countdown', async (req, res) => {
  try {
    await pool.query('UPDATE settings SET countdown_date = \'0000-00-00 00:00:00\' WHERE id = 1');
    res.json({ message: 'Countdown date reset successfully' });
  } catch (err) {
    console.error('Reset countdown error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Reset all (countdown and votes)
app.post('/api/reset-all', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Reset countdown
    await client.query('UPDATE settings SET countdown_date = \'0000-00-00 00:00:00\' WHERE id = 1');
    
    // Delete all votes
    await client.query('DELETE FROM votes');
    
    await client.query('COMMIT');
    res.json({ message: 'Reset successful: countdown reset and votes deleted' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Reset all error:', err);
    res.status(500).json({ error: 'Transaction failed' });
  } finally {
    client.release();
  }
});

// Change password
app.put('/api/users/:id_number/change-password', async (req, res) => {
  const { id_number } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'A jelenlegi és az új jelszó megadása kötelező.' });
  }

  try {
    // Get current password hash
    const result = await pool.query('SELECT password_hash FROM users WHERE id_number = $1', [id_number]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Felhasználó nem található.' });
    }

    const storedPasswordHash = result.rows[0].password_hash;
    const isMatch = await bcrypt.compare(currentPassword, storedPasswordHash);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'A jelenlegi jelszó nem helyes.' });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateResult = await pool.query(
      'UPDATE users SET password_hash = $1 WHERE id_number = $2 RETURNING *',
      [hashedPassword, id_number]
    );

    if (updateResult.rowCount > 0) {
      res.status(200).json({ message: 'A jelszó sikeresen megváltozott.' });
    } else {
      res.status(404).json({ message: 'Felhasználó nem található.' });
    }
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ message: 'Hiba történt a jelszó módosítása során.' });
  }
});

// Get user votes
app.get('/api/votes', async (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM votes WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Votes query error:', err);
    res.status(500).json({ message: 'Hiba történt' });
  }
});

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadDir));

// Export the app for Vercel
module.exports = app;

// Local development server
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}