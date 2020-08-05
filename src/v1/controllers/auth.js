import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

import User from '../models/User';

export default class AuthController {
  static async signup(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          emailError: 'This email is already registered in our system',
        });
      }
      const newUser = new User(req.body);
      newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
      const savedUser = await newUser.save();
      savedUser.hashPassword = undefined;
      return res.status(201).json({
        success: true,
        data: {
          savedUser,
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
