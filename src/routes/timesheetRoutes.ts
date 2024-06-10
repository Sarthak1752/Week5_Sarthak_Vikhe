import {Router} from 'express';
import {creatTimesheet} from '../controllers/timesheetController';
import authMiddlerware from '../middleware/authMiddleware';

const router  = Router();
router.post('/',authMiddlerware,creatTimesheet);

export default router;