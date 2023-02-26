import Movie from '../models/movie.js';
import BadRequestError from '../errors/BadRequestError.js';
import {
  badRequestErrorMessage,
  movieDeletedMessage,
  returnNotFoundMovieErrorText,
  wrongUserMessage,
} from '../utils/constants.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

export const getCurrentUserMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => next(err));
};

export const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ ...req.body, owner })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

export const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError(returnNotFoundMovieErrorText(movieId)))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(wrongUserMessage);
      }

      movie.remove().then(() => res.send({ message: movieDeletedMessage }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};
