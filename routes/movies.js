import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createMovie,
  deleteMovie,
  getCurrentUserMovies,
} from '../controllers/movies.js';
import { validateUrlRegex } from '../utils/validateRegex.js';

const movies = Router();

movies.get('', getCurrentUserMovies);

movies.post(
  '',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(validateUrlRegex),
      trailerLink: Joi.string().required().pattern(validateUrlRegex),
      thumbnail: Joi.string().required().pattern(validateUrlRegex),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

movies.delete(
  '/:movieId',
  celebrate({
    params: {
      movieId: Joi.string().length(24).hex().required(),
    },
  }),
  deleteMovie,
);

export default movies;
