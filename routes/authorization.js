import { Router } from 'express';
import { signIn, signUp } from '../controllers/authorization.js';
import {
  signInValidator,
  signUpValidator,
} from '../middlewares/validators/authorization.js';

const authorization = Router();

authorization.post('/signup', signUpValidator, signUp);
authorization.post('/signin', signInValidator, signIn);

export default authorization;
