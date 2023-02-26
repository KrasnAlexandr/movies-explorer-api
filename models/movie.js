import { Schema, model } from 'mongoose';
import { MOVIE_SCHEMA_ERROR_MESSAGE } from '../utils/constants.js';
import { validateUrlRegex } from '../utils/validateRegex.js';

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validateUrlRegex.test(v);
      },
      message: MOVIE_SCHEMA_ERROR_MESSAGE.WRONG_URL,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validateUrlRegex.test(v);
      },
      message: MOVIE_SCHEMA_ERROR_MESSAGE.WRONG_URL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validateUrlRegex.test(v);
      },
      message: MOVIE_SCHEMA_ERROR_MESSAGE.WRONG_URL,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

export default model('movie', movieSchema);
