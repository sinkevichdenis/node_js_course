import express from 'express';
import cors from 'cors';
import config from './config';
import { router } from './routes/app.route';
import { errorMiddleware } from './middlewars/errorMiddleware';
import { logErrorHandler, loggerMiddleware, authMiddleware } from './middlewars';

const app = express();
const PORT = config.get('port');

process.on('unhandledRejection', logErrorHandler);
process.on('uncaughtException', logErrorHandler);

app.use(cors());
app.use(express.json({ extended: true }));
app.use(authMiddleware);
app.use('/', router);
app.use(loggerMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`);
});
