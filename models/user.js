import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { USER_SCHEMA_ERROR_MESSAGE } from '../utils/constants.js';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
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

function findUserByCredentials(email, password) {
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
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

export default model('user', userSchema);
