const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connection to MariaDB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'crushme'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Routes
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Fetching invitation data
app.get('/api/invitation/:id', (req, res) => {
    const invitationId = req.params.id;
    
    const query = 'SELECT * FROM invitations WHERE id = ?'; 

    db.query(query, [invitationId], (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).send('Invitation not found');
            }
        }
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


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


app.post('/api/invitation', (req, res) => {
    const { id, email, date, messageOui, messageNon } = req.body;
    
    const query = 'INSERT INTO invitations (id, email, date, messageOui, messageNon) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id, email, date, messageOui, messageNon], (err, result) => {
      if (err) {
        res.status(500).send('Error saving data');
      } else {
        res.json({ message: 'Invitation saved', id });
      }
    });
  });
  