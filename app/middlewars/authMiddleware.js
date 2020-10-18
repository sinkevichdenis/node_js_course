import config from '../config';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    if (req.path === '/login') return next();
    try {
        const token = req.headers['x-token'];
        const secret = config.get('privateKey');
        jwt.verify(token, secret, (err) => (
            err ? res.sendStatus(401) : next()
        ));
    } catch (e) {
        res.sendStatus(403);
    }
};