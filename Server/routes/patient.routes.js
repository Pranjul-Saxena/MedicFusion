import { Router } from 'express';
import { addPatient, deletePatient, getPatientDetails, getPatients, searchPatients, updatePatient } from '../controllers/patient.controller.js';

const router = Router();

router.route('/addpatient')
    .get()
    .post(addPatient);

router.route('/getpatients/:clinic_id')
    .get(getPatients)
    .post();

// Route to update patient details
router.patch('/update-patient/:patient_id', updatePatient);
// Route to delete a patient
router.delete('/delete-patient/:patient_id', deletePatient);
router.get('/search', searchPatients);
router.get('/:id', getPatientDetails);

export default router;