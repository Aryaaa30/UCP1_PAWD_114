const db = require('../models/db');

// Get all patients
exports.getAllPatients = (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) throw err;
        res.render('patients', { patients: results });
    });
};

// Add a new patient
exports.addPatient = (req, res) => {
    const { name, age, diagnosis } = req.body;
    db.query('INSERT INTO patients SET ?', { name, age, diagnosis }, (err) => {
        if (err) throw err;
        res.redirect('/patients');
    });
};

// Edit patient (display form with existing data)
exports.editPatient = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM patients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.render('edit-patient', { patient: results[0] });
        } else {
            res.status(404).send('Patient not found');
        }
    });
};

// Update a patient
exports.updatePatient = (req, res) => {
    const { id } = req.params;
    const { name, age, diagnosis } = req.body;
    db.query(
        'UPDATE patients SET name = ?, age = ?, diagnosis = ? WHERE id = ?',
        [name, age, diagnosis, id],
        (err) => {
            if (err) throw err;
            res.redirect('/patients');
        }
    );
};

// Delete a patient
exports.deletePatient = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM patients WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/patients');
    });
};
