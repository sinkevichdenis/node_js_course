import { connectModel } from '../services/crud.service';
import { handleSuccess } from '../services/utils.service';

export const connectUserRoutes = (model, router) => {
    const modelApi = connectModel(model);

    router.get('/list', async (req, res, next) => {
        const substring = req.query.substr || '';
        const limit = parseInt(req.query.limit || 10, 10);
        try {
            const users = await modelApi.getList(substring, limit);
            handleSuccess(res, 'listLoad', { users });
        } catch (e) {
            return next(e);
        }
    });

    router.get('/user/:id', async (req, res, next) => {
        try {
            const user = await modelApi.get(req.params.id);
            handleSuccess(res, 'get', { user, hasUser: !!user });
        } catch (e) {
            return next(e);
        }
    });

    router.post('/user', async (req, res, next) => {
        try {
            await modelApi.create(req.body);
            handleSuccess(res, 'add');
        } catch (e) {
            return next(e);
        }
    });

    router.put('/user/:id', async (req, res, next) => {
        try {
            await modelApi.update(req.params.id, req.body);
            handleSuccess(res, 'update');
        } catch (e) {
            return next(e);
        }
    });

    router.delete('/user/:id', async (req, res, next) => {
        try {
            await modelApi.remove(req.params.id);
            handleSuccess(res, 'remove');
        } catch (e) {
            return next(e);
        }
    });
};
