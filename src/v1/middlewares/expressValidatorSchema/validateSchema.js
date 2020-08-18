/* eslint-disable class-methods-use-this */
import { validationResult } from 'express-validator';

class ValidateSchema {
  static checkForValidationError(req) {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      const errorMessages = [];
      validationError.array().map((error) => errorMessages.push(error.msg));
      return errorMessages;
    }
    return null;
  }

  validateSignUpSchema(req, res, next) {
    // check for validation errors
    const validationError = ValidateSchema.checkForValidationError(req);
    if (validationError) {
      return res.status(400).json({
        status: 'error',
        error: validationError,
      });
    }

    return next();
  }

  validateSignInSchema(req, res, next) {
    // check for validation errors
    const validationError = ValidateSchema.checkForValidationError(req);
    if (validationError) {
      return res.status(400).json({
        status: 'error',
        error: validationError,
      });
    }

    return next();
  }
}

export default ValidateSchema;
