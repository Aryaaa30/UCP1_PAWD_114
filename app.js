const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

// Inisialisasi aplikasi Express
const app = express();
const port = 3000;

// Setup untuk EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk parsing body dari request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Ganti dengan username MySQL Anda
    password: '',       // Ganti dengan password MySQL Anda
    database: 'patient_management'  // Nama database yang sudah Anda buat di phpMyAdmin
});

// Connect ke database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

// Rute untuk menampilkan semua pasien (gunakan /patients)
app.get('/patients', (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
            console.error(err);
            res.send('Error fetching data');
        } else {
            res.render('patients', { patients: results });
        }
    });
});

// Rute untuk menambah pasien
app.get('/add-patient', (req, res) => {
    res.render('add-patient');
});

app.post('/add-patient', (req, res) => {
    const { name, age, diagnosis } = req.body;
    const query = 'INSERT INTO patients (name, age, diagnosis) VALUES (?, ?, ?)';
    db.query(query, [name, age, diagnosis], (err, results) => {
        if (err) {
            console.error(err);
            res.send('Error adding patient');
        } else {
            res.redirect('/patients');
        }
    });
});

// Rute untuk mengedit data pasien
app.get('/edit-patient/:id', (req, res) => {
    const patientId = req.params.id;
    db.query('SELECT * FROM patients WHERE id = ?', [patientId], (err, result) => {
        if (err) {
            console.error(err);
            res.send('Error fetching patient data');
        } else {
            res.render('edit-patient', { patient: result[0] });
        }
    });
});

app.post('/edit-patient/:id', (req, res) => {
    const patientId = req.params.id;
    const { name, age, diagnosis } = req.body;
    const query = 'UPDATE patients SET name = ?, age = ?, diagnosis = ? WHERE id = ?';
    db.query(query, [name, age, diagnosis, patientId], (err, results) => {
        if (err) {
            console.error(err);
            res.send('Error updating patient data');
        } else {
            res.redirect('/patients');
        }
    });
});

// Rute untuk menghapus pasien
app.get('/delete-patient/:id', (req, res) => {
    const patientId = req.params.id;
    db.query('DELETE FROM patients WHERE id = ?', [patientId], (err, results) => {
        if (err) {
            console.error(err);
            res.send('Error deleting patient');
        } else {
            res.redirect('/patients');
        }
    });
});

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
