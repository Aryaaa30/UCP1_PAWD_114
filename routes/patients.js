const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Route: Get all patients
router.get('/', patientController.getAllPatients);

// Route: Add new patient form
router.get('/add', (req, res) => {
    res.render('add-patient');
});

// Route: Add new patient (POST)
router.post('/add', patientController.addPatient);

// Route: Edit patient form
router.get('/edit/:id', patientController.editPatient);

// Route: Update patient (POST)
router.post('/update/:id', patientController.updatePatient);

// Route: Delete patient
router.get('/delete/:id', patientController.deletePatient);

module.exports = router;
