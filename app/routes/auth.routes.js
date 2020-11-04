import { login } from '../services';

export const connectAuthRoutes =  (prefix, router) => {
    router.post(prefix, async (req, res, next) => {
        try {
            const token = await login(req.body.login, req.body.password);
            console.log('TOKEN', token)
            token ? res.send({ token }) : res.sendStatus(401);
        } catch (e) {
            return next(e);
        }
    });
};
