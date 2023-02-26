import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { signIn, signUp } from '../controllers/authorization.js';

const authorization = Router();

authorization.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  signUp,
);

authorization.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  signIn,
);

export default authorization;
