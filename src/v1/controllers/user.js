import User from '../models/User';

export default class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      return res.status(200).json({
        success: true,
        data: {
          users,
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
