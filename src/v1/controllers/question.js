import Question from '../models/Question';

export default class QuestionController {
  static async getAllQuestions(req, res) {
    try {
      const questions = await Question.find({}).sort({ createdAt: 'desc' });

      if (!Array.isArray(questions) || !questions.length) {
        res.status(204).json({
          success: true,
          message: 'No questions found',
        });
      }
      return res.status(200).json({
        success: true,
        data: questions,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async postQuestion(req, res) {
    try {
      const {
        title, company, companyLocation, description, jobRole, tags,
      } = req.body;
      const question = new Question({
        title,
        company,
        postedBy: req.user.name,
        companyLocation,
        description,
        jobRole,
        tags,
      });
      const newQuestion = await question.save();
      return res.status(201).json({
        success: true,
        data: {
          newQuestion,
        },
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
