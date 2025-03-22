import { Router } from 'express';
import { addAppointment, getAppointments, getPrescriptions, addPrescription } from '../controllers/appointment.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/prescription/:appointmentId')
    .get(getPrescriptions)
    .post(upload.array("reports", 5), addPrescription)

router.post('/addappointment', addAppointment);

router.get('/getappointments', getAppointments);

router.route('/:id')
    .get()
    .post();

export default router;