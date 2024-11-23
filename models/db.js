const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',  // Server database
    user: 'root',       // Username MySQL Anda
    password: '',       // Password MySQL Anda (kosong jika tidak ada password)
    database: 'patient_management'  // Nama database yang Anda buat di phpMyAdmin
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
