import Router from 'express';
import {startShift,endShift} from '../controllers/shiftController';
import authMiddlerware from '../middleware/authMiddleware';

const router = Router();

router.post('/start',authMiddlerware,startShift);
router.post('/end',authMiddlerware,endShift);

export default router;