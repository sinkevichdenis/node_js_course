import { connectModel, handleSuccess } from '../services';

export const connectRoutes = (prefix, model, router) => {
    const modelApi = connectModel(model);

    router.get(`${prefix}/list`, async (req, res, next) => {
        const substring = req.query.substr || '';
        const limit = parseInt(req.query.limit || 10, 10);
        try {
            const result = await modelApi.getList(substring, limit);
            handleSuccess(res, 'listLoad', result);
            return next();
        } catch (e) {
            return next(e);
        }
    });

    router.get(`${prefix}/:id`, async (req, res, next) => {
        try {
            const result = await modelApi.get(req.params.id);
            handleSuccess(res, 'get', result);
            return next();
        } catch (e) {
            return next(e);
        }
    });

    router.post(prefix, async (req, res, next) => {
        try {
            await modelApi.create(req.body);
            handleSuccess(res, 'add');
            return next();
        } catch (e) {
            return next(e);
        }
    });

    router.put(`${prefix}/:id`, async (req, res, next) => {
        try {
            await modelApi.update(req.params.id, req.body);
            handleSuccess(res, 'update');
            return next();
        } catch (e) {
            return next(e);
        }
    });

    router.delete(`${prefix}/:id`, async (req, res, next) => {
        try {
            await modelApi.remove(req.params.id);
            handleSuccess(res, 'remove');
            return next();
        } catch (e) {
            return next(e);
        }
    });
};
