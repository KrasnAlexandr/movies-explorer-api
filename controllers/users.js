import User from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';
import BadRequestError from '../errors/BadRequestError.js';
import {
  badRequestErrorMessage,
  returnNotFoundUserErrorText,
} from '../utils/constants.js';

export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(returnNotFoundUserErrorText(req.user._id)))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

export const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(returnNotFoundUserErrorText(req.user._id)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};
