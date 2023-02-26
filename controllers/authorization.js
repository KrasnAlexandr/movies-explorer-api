import User from '../models/user.js';
import RequestConflictError from '../errors/RequestConflictError.js';
import BadRequestError from '../errors/BadRequestError.js';
import {
  badRequestErrorMessage,
  USER_SCHEMA_ERROR_MESSAGE,
} from '../utils/constants.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashPassword,
      name,
    });
    res.status(200).send({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'MongoServerError' && err.code === 11000) {
      next(new RequestConflictError(USER_SCHEMA_ERROR_MESSAGE.WRONG_EMAIL));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError(badRequestErrorMessage));
    } else {
      next(err);
    }
  }
};

const { NODE_ENV, JWT_KEY } = process.env;
export const signIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_KEY : 'jwt',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => next(new UnauthorizedError(err.message)));
};
