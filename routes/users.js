import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { getCurrentUser, updateCurrentUser } from '../controllers/users.js';

const users = Router();

users.get('/me', getCurrentUser);

users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateCurrentUser,
);

export default users;
