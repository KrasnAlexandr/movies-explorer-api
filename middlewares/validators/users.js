import { celebrate, Joi } from 'celebrate';

const updateCurrentUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

export default updateCurrentUserValidator;
