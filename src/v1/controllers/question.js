import { stringify } from 'flatted';
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
      const updatedQuestion = Question.findOneAndUpdate(
        { _id: req.params.questionId }, req.body, { new: true, useFindAndModify: false },
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
