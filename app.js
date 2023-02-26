import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as bodyParser from 'express';
import { errorLogger, requestLogger } from './middlewares/logger.js';
import { corsParams, rateLimitParams } from './utils/constants.js';
import { errors } from 'celebrate';
import cors from 'cors';
import { handlerErrors } from './middlewares/error.js';
import router from './routes/index.js';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => console.log('Database connection ready'));

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(rateLimit(rateLimitParams));
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors(corsParams));
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
