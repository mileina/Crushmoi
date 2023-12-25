require('dotenv').config({ path: './.env.eu-nort' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3001;

// Configuration CORS
const corsOptions = {
  origin: 'https://crushmoi-b78956e48bb4.herokuapp.com',
  optionsSuccessStatus: 200
};

// Utiliser CORS avec les options configurées
app.use(cors(corsOptions));

// Utiliser bodyParser
app.use(bodyParser.json());

// Vérification des variables d'environnement
console.log("DB Host:", process.env.DB_HOST);
console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);
console.log("DB Database:", process.env.DB_DATABASE);
console.log("DB Port:", process.env.DB_PORT);

// Connection to MariaDB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Fetch invitation data
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

// Create a new invitation
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

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
