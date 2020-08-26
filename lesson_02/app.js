import express from 'express';
import config from './config';
import { router } from './routes/app.route';

const app = express();
const PORT = config.get('port');

app.use(express.json({ extended: true }));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`);
});
