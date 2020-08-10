/* eslint-disable consistent-return */
class ValidationMiddleware {
  static validateEmail(req, res, next) {
    const { email } = req.body;
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
}

export default ValidationMiddleware;
