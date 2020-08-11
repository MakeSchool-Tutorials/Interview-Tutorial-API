import { Router } from 'express';

import AuthRouter from './auth';
import UserRouter from './user';
import QuestionRouter from './question';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/question', QuestionRouter);

export default router;
