require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connection to MariaDB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Routes

// Accueil du serveur
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Récupération des données d'invitation
app.get('/api/invitation/:id', (req, res) => {
    const invitationId = req.params.id;
    const query = 'SELECT * FROM invitations WHERE id = ?';
    db.query(query, [invitationId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving data' });
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ error: 'Invitation not found' });
            }
        }
    });
});

// Création d'une nouvelle invitation
app.post('/api/invitation', (req, res) => {
    const { id, email, date, messageOui, messageNon } = req.body;
    const query = 'INSERT INTO invitations (id, email, date, messageOui, messageNon) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id, email, date, messageOui, messageNon], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error saving data' });
      } else {
        res.json({ message: 'Invitation saved', id });
      }
    });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

