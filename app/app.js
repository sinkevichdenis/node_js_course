import express from 'express';
import config from './config';
import { router } from './routes/app.route';
import { ErrorHandler } from './middlewars/ErrorHandler';
import { logErrorHandler, logInfoHandler } from './middlewars/logger';

const app = express();
const PORT = config.get('port');

Promise.reject(new Error('Promise Error'));

process.on('unhandledRejection', err => {
    logErrorHandler(err);
});

app.use(express.json({ extended: true }));
app.use('/', router);
app.use((req, res, next) => {
    logInfoHandler(req);
    next();
});
app.use((err, req, res, next) => {
    ErrorHandler(req, res, err);
    next();
});

app.listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`);
});
