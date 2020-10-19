import config from '../config';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.headers['x-token'];
    if (!token) {
        res.sendStatus(401);
    } else {
        const secret = config.get('privateKey');
        jwt.verify(token, secret, (err) => (
            err ? res.sendStatus(403) : next()
        ));
    }
};
