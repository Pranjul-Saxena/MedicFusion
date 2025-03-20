import { Router } from 'express';
import { getDoctors, login, logout } from '../controllers/user.controller.js';

const router = Router();

router.route('/login')
    .post(login);
router.route('/logout')
    .post(logout);
router.route('/getDoctors/:clinic_id')
    .get(getDoctors)
router.route('/:userid')
    .get()
    .post();

export default router;