import { Router } from 'express';
import auth from '../middlewares/auth.js';
import authorization from './authorization.js';
import users from './users.js';
import movies from './movies.js';
import { notFoundErrorMessage } from '../utils/constants.js';
import NotFoundError from '../errors/NotFoundError.js';

const router = Router();

router.use('', authorization);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);
router.use('*', (req, res, next) => {
  next(new NotFoundError(notFoundErrorMessage));
});

export default router;
