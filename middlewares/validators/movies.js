import { celebrate, Joi } from 'celebrate';

export const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }),
    trailerLink: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }),
    thumbnail: Joi.string()
      .required()
      .uri({ scheme: ['http', 'https'] }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

export const deleteMovieValidator = celebrate({
  params: {
    movieId: Joi.string().length(24).hex().required(),
  },
});
