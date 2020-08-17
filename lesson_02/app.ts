import express from 'express';
import http from 'http';
import path from 'path';
import config from './config';
import { User } from './models/user.type'

const app: express.Application = express();
const port = config.get('port');

http.createServer(app).listen(port, () => {
    console.log(`App is listening on port http://localhost:${port}`);
});

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.use(( req, res, next) => {
    req.url === '/' ? res.render('index', {
        body: '<b>TEST TEST</b>'
    }) : next();
});

app.use(( req, res, next) => {
    req.url === '/test' ? res.send('Test') : next();
});

app.use((req, res) => {
    res.status(404).send('Sorry, we cannot find that!');
});

/*app.use((err, req, res, next) => {
    if (app.get('env') === 'development') {
        const errorHandler = express.errorHandler()
        errorHandler(err, req, res, next);
    } else {
        res.sendStatus(500);
    }
});*/

const user1: User = {
    id: '1',
    login: 'user1',
    password: '1',
    age: 10,
    isDeleted: false,
};

const user2: User = {
    id: '2',
    login: 'user2',
    password: '1',
    age: 10,
    isDeleted: false,
};

