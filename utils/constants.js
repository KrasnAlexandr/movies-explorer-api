export const badRequestErrorMessage = 'Переданы некорректные данные';
export const wrongUserMessage = 'Вы не можете удалить чужой фильм';
export const movieDeletedMessage = 'Фильм был удален';
export const notFoundErrorMessage = 'По вашему запросу ничего не найдено';
export const returnNotFoundUserErrorText = (id) =>
  `Пользователь с указанным id: ${id} не найден.`;
export const returnNotFoundMovieErrorText = (id) =>
  `Фильм с указанным id: ${id} не найден.`;

export const USER_SCHEMA_ERROR_MESSAGE = {
  WRONG_EMAIL: 'Указан некорректный e-mail ',
  WRONG_EMAIL_OR_PASSWORD: 'Неверный логин или пароль',
};

export const MOVIE_SCHEMA_ERROR_MESSAGE = {
  WRONG_URL: 'Указана некорректная ссылка',
};

export const corsParams = {
  origin: [
    'https://movies.alexred.nomoredomains.work',
    'http://movies.alexred.nomoredomains.work',
    'http://localhost:3000',
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

export const rateLimitParams = {
  windowMs: 60 * 1000,
  max: 100,
};
