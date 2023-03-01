import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as bodyParser from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import { errorLogger, requestLogger } from './middlewares/logger.js';
import {
  corsParams,
  DATABASE_URL,
  rateLimitParams,
} from './utils/constants.js';
import handlerErrors from './middlewares/error.js';
import router from './routes/index.js';

dotenv.config();

mongoose.set('strictQuery', false);

const { NODE_ENV, MONGO_URL } = process.env;
mongoose
  .connect(NODE_ENV === 'production' ? MONGO_URL : DATABASE_URL)
  .then(() => console.log('Database connection ready'));

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(requestLogger);
app.use(rateLimit(rateLimitParams));
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsParams));
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
