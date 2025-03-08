import { Router } from 'express';
import { addClinic, addUser, getClinics, getUsers } from '../controllers/superAdmin.controller.js';

const router = Router();

router.route('/addClinic')
    .post(addClinic);
router.route('/getClinic')
    .get(getClinics);


router.route('/addUser')
    .post(addUser);
router.route('/updateUser')
    .post(addUser);
router.route('/userDetails')
    .get(getUsers);

export default router;