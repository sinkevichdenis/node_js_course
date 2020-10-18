import { login } from '../services/utils.service';

//console.log('TOKEN LOGIN', await login('DenisUpdated', '66699'))
export const connectAuthRoutes =  (prefix, router) => {
    router.post(prefix, async (req, res, next) => {
        try {
            let token = await login(req.body.login, req.body.password);
            token ? res.send({token}) : res.sendStatus(401);
            return next();
        } catch (e) {
            return next(e);
        }
    });
};
