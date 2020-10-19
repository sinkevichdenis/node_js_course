import { login } from '../services/utils.service';

export const connectAuthRoutes =  (prefix, router) => {
    router.post(prefix, async (req, res, next) => {
        try {
            const token = await login(req.body.login, req.body.password);
            token ? res.send({ token }) : res.sendStatus(401);
        } catch (e) {
            return next(e);
        }
    });
};
