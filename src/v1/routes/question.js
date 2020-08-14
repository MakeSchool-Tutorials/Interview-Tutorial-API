import { Router } from 'express';
import QuestionController from '../controllers/question';
import ValidationMiddleware from '../middlewares/validationMiddlewares';

const QuestionRouter = Router();

QuestionRouter.post(
  '/postQuestion',
  ValidationMiddleware.validateToken,
  ValidationMiddleware.signInRequired,
  QuestionController.postQuestion,
);

QuestionRouter.get(
  '/getAllQuestions',
  ValidationMiddleware.validateToken,
  ValidationMiddleware.signInRequired,
  QuestionController.getAllQuestions,
);

QuestionRouter.put(
  '/updateQuestion/:userId/:questionId',
  ValidationMiddleware.validateToken,
  ValidationMiddleware.signInRequired,
  QuestionController.updateQuestion,
);

export default QuestionRouter;
