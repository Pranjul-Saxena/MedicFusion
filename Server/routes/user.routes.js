import { Router } from 'express';

const router = Router();

router.route('/')
    .get()
    .post();


router.route('/:id')
    .get()
    .post();

export default router;