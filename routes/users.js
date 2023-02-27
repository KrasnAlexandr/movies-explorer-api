import { Router } from 'express';
import { getCurrentUser, updateCurrentUser } from '../controllers/users.js';
import updateCurrentUserValidator from '../middlewares/validators/users.js';

const users = Router();

users.get('/me', getCurrentUser);

users.patch('/me', updateCurrentUserValidator, updateCurrentUser);

export default users;
