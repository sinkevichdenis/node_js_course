import express from 'express';
import config from './config';
import { router } from './routes/app.route';
import { ErrorHandler } from './middlewars/ErrorHandler';

const app = express();
const PORT = config.get('port');

app.use(express.json({ extended: true }));
app.use('/', router);
app.use((err, req, res, next) => {
    ErrorHandler(res, err);
    next();
});

app.listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`);
});
