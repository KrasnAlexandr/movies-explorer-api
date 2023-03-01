import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { USER_SCHEMA_ERROR_MESSAGE } from '../utils/constants.js';

const { NODE_ENV, JWT_KEY } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(USER_SCHEMA_ERROR_MESSAGE.UNAUTHORZED_ERROR));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_KEY : 'jwt');
  } catch (err) {
    next(new UnauthorizedError(USER_SCHEMA_ERROR_MESSAGE.UNAUTHORZED_ERROR));
  }
  req.user = payload;
  next();
};

export default auth;
