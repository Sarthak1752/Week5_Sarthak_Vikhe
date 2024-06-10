import{Router} from 'express';
import { generateReport } from '../controllers/reportController';
import authMiddlerware from '../middleware/authMiddleware';

const router = Router();

router.get('/report',authMiddlerware,generateReport);

export default router;