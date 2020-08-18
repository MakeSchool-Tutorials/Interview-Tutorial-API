import { Router } from 'express';
import UserController from '../controllers/user';
import ValidationMiddleware from '../middlewares/validationMiddlewares';

const UserRouter = Router();

UserRouter.get(
  '/getAllUsers',
  ValidationMiddleware.validateToken,
  ValidationMiddleware.signInRequired,
  UserController.getAllUsers,
);

export default UserRouter;
