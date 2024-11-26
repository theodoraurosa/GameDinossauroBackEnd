
import { Router } from 'express';
import { ScoreController } from '../controllers/scoreController';

const router: Router = Router();
const scoreController = new ScoreController();

router.post('/scores', scoreController.addScore);
router.get('/scores', scoreController.getScores);

export default router;