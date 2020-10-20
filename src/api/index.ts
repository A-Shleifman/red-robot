import { Router } from 'express';
import { robotRouter } from './routes/robot';

const router = Router();

router.use('/robot', robotRouter);

export default router;
