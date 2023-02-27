import { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  getCurrentUserMovies,
} from '../controllers/movies.js';
import {
  createMovieValidator,
  deleteMovieValidator,
} from '../middlewares/validators/movies.js';

const movies = Router();

movies.get('', getCurrentUserMovies);
movies.post('', createMovieValidator, createMovie);
movies.delete('/:movieId', deleteMovieValidator, deleteMovie);

export default movies;
