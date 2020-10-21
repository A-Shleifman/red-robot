import { Request, Router } from 'express';
import MarsService from 'services/MarsService';
import { UUID } from 'types';

const marsService = new MarsService();

const router = Router();

router.get('/:id', (req: Request<{ id: UUID }>, res) => {
  const mars = marsService.getMarsInstanceById(req.params.id);

  res.json(mars.toJSON());
});

export interface MarsInDto {
  x: number;
  y: number;
}

router.post('/', (req: Request<{}, {}, MarsInDto>, res) => {
  const { x, y } = req.body;
  const mars = marsService.createMarsInstance(x, y);

  res.json(mars.toJSON());
});

export const marsRouter = router;
