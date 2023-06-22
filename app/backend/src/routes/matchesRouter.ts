import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatchFinished(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  Validations.validateMatches,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
