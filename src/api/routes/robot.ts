import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ 0: 0 });
});

export const robotRouter = router;
