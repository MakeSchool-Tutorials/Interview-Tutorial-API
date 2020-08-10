import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export default class AuthController {
  static async signup(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          status: 'error',
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

  static async signin(req, res) {
    try {
      let token;
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'No user found! Signup to continue',
        });
      } if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res.status(401).json({
            success: false,
            message: 'Authentication failed. Wrong password!',
          });
        } else {
          token = await jwt.sign({
            id: user.id, name: user.name, _id: user.id, email: user.email,
          }, `${process.env.jwt_secret}`, { expiresIn: '2d' });
        }
      }
      return res.status(200).json({
        success: true,
        data: {
          token,
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
