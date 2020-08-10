import Question from '../models/Question';

export default class QuestionController {
  // eslint-disable-next-line consistent-return
  static getAllQuestions(req, res) {
    try {
      Question.find({}, (err, questions) => {
        if (err) {
          res.send(err);
        }
        if (!Array.isArray(questions) || !questions.length) {
          res.status(400).json({
            msg: 'No questions found',
          });
        }
        return res.status(200).json({
          success: true,
          data: questions,
        });
      })
        .sort({ date: 'desc' });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
