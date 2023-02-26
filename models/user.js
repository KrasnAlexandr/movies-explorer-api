import { Schema, model } from 'mongoose';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { USER_SCHEMA_ERROR_MESSAGE } from '../utils/constants.js';
import { validateEmailRegex } from '../utils/validateRegex.js';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validateEmailRegex.test(v);
      },
      message: USER_SCHEMA_ERROR_MESSAGE.WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(
            USER_SCHEMA_ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD,
          ),
        );
      }
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(
            new UnauthorizedError(
              USER_SCHEMA_ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD,
            ),
          );
        }
        return user;
      });
    });
};

export default model('user', userSchema);
