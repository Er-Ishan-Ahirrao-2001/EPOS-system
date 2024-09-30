const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool setup
const database = mysql.createPool({
    host: 'localhost',
    port: 4306,
    user: 'root',
    password: '',
    database: 'epos_database',
});

// Test MySQL connection
database.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

// API route to handle login requests
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await database.promise().query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'No records available. Try again.' });
        }

        const user = rows[0];

        // Check plain password against stored password
        if (user.password !== password) {
            return res.status(401).json({ message: 'No records available. Try again.' });
        }

        // Successful login
        return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error processing login request:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
