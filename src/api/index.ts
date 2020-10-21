import { marsRouter } from 'api/routes/mars';
import { Router } from 'express';
import { robotRouter } from './routes/robot';

const router = Router();

router.use('/mars', marsRouter);
router.use('/robot', robotRouter);

export default router;
