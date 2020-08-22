import express from 'express';
import config from './config';
import {router} from './routes/app.route';

const app = express();
const PORT = config.get('port');

app.use(express.json({extended: true}));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`);
});


/*
        // app.use('/', router)
        app.use(( req, res, next) => {
            /!*res.json({ok: true})*!/
            console.log('!!!!')
            req.url === '/' ? res.status(200) : next();
        });

        app.use(( req, res, next) => {
            console.log('next')
            req.url === '/test' ? res.send('Test') : next();
        });

        app.use((req, res) => {
            res.status(404).send('Sorry, we cannot find that!');
        });
*/

/*app.use((err, req, res, next) => {
    if (app.get('env') === 'development') {
        const errorHandler = express.errorHandler()
        errorHandler(err, req, res, next);
    } else {
        res.sendStatus(500);
    }
});*/

