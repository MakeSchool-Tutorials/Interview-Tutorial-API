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
        postedBy: req.user.id,
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

  static async updateQuestion(req, res) {
    try {
      // check to see if it was the user who posted the question
      const { userId } = req.params;
      const question = await Question.findOne({ postedBy: userId });
      if (!question) {
        return res.status(400).json({
          status: 'error',
          messsage: 'You haven\'t posted any questions',
        });
      }

      if ((!question.postedBy === userId)) {
        return res.status(400).json({
          status: 'error',
          messsage: 'Oops, you cannot edit a question you did not post',
        });
      }
      const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.questionId, req.body, { new: true, useFindAndModify: false },
      );
      return res.status(200).json({
        success: true,
        data: {
          updatedQuestion,
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
