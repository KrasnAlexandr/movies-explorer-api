export const badRequestErrorMessage = 'Переданы некорректные данные';
export const wrongUserMessage = 'Вы не можете удалить чужой фильм';
export const movieDeletedMessage = 'Фильм был удален';
export const notFoundErrorMessage = 'По вашему запросу ничего не найдено';
export const returnNotFoundUserErrorText = (id) => `Пользователь с указанным id: ${id} не найден.`;
export const returnNotFoundMovieErrorText = (id) => `Фильм с указанным id: ${id} не найден.`;

export const returnErrorMessage = (message) => `На сервере произошла ошибка': ${message}`;

export const USER_SCHEMA_ERROR_MESSAGE = {
  WRONG_EMAIL: 'Указан некорректный e-mail ',
  WRONG_EMAIL_OR_PASSWORD: 'Неверный логин или пароль',
  CONFLICT_ERROR: 'Пользователь с указанным e-mail уже зарегистрирован',
  UNAUTHORZED_ERROR: 'Необходима авторизация',
};

export const WRONG_URL_ERROR_MESSAGE = 'Указана некорректная ссылка';

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

export const DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
