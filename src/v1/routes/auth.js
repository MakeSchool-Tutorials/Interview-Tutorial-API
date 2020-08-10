import { Router } from 'express';
import { checkSchema } from 'express-validator';
import AuthController from '../controllers/auth';
import signUpSchema from '../middlewares/expressValidatorSchema/signUpSchema';
import ValidateSchema from '../middlewares/expressValidatorSchema/validateSchema';
import ValidationMiddleware from '../middlewares/validationMiddlewares';

const validateSchema = new ValidateSchema();
const AuthRouter = Router();

AuthRouter.post(
  '/signup',
  checkSchema(signUpSchema),
  validateSchema.validateSignUpSchema,
  ValidationMiddleware.validateEmail,
  AuthController.signup,
);

export default AuthRouter;
