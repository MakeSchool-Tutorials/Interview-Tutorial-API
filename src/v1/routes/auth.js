import { Router } from 'express';
import AuthController from '../controllers/auth';

const AuthRouter = Router();

AuthRouter.post(
  '/signup',
  AuthController.signup,
);

export default AuthRouter;
