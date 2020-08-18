/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

class ValidationMiddleware {
  static validateEmail(req, res, next) {
    const { email } = req.body;
    // regex format to check if email is in its correct format
    const emailRegexFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    try {
      if (emailRegexFormat.test(email)) {
        if (email.indexOf('@students.makeschool.com', email.length - '@students.makeschool.com'.length) !== -1) {
          next();
        } else {
          return res.status(401).json({
            success: false,
            message: 'Unauthorized user!',
          });
        }
      }
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async validateToken(req, res, next) {
    let isTokenValid;
    if (!req.headers.authorization) {
      return res.status(400).json({
        status: 'error',
        error: 'This endpoint is protected. Attach an authentication token to request header',
      });
    }
    try {
      isTokenValid = await jwt.verify(req.headers.authorization.split(' ')[1], `${process.env.jwt_secret}`);
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid authentication token',
      });
    }
    req.user = isTokenValid;
    return next();
  }

  static signInRequired(req, res, next) {
    try {
      if (req.user) {
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized user!',
        });
      }
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default ValidationMiddleware;
