import express from 'express';
import config from './config';
import { router } from './routes/app.route';
import { ErrorHandler } from './middlewars/ErrorHandler';
import { logErrorHandler, logInfoHandler } from './middlewars/logger';

const app = express();
const PORT = config.get('port');

const callbackError = () => {
    try {
        setTimeout(() => {
            throw new Error('Error in call back!!!!!!');
        }, 3000);
    } catch (e) {
        console.log(e);
    }
};
callbackError();
// callback is handled as uncaughtException!

Promise.reject(new Error('Promise Error'));
// why isn't promise handled as uncaughtException?

process.on('uncaughtException', err => {
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
