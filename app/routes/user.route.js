import { connectModel } from '../services/crud.service';
import { handleError, handleSuccess } from '../services/feedbacks.service';

export const connectUserRoutes = ( model, router ) => {
    const modelApi = connectModel(model);

    router.get('/list', async (req, res) => {
        const substring = req.query.substr || '';
        const limit = parseInt(req.query.limit || 10, 10);
        try {
            const users = await modelApi.getList(substring, limit);
            handleSuccess(res, 'listLoad', {users});
        } catch (e) {
            handleError(res, e);
        }
    });

    router.get('/user/:id', async (req, res) => {
        try {
            const user = await modelApi.get(req.params.id);
            handleSuccess(res, 'get', {user, hasUser: !!user});
        } catch (e) {
            handleError(res, e);
        }
    });

    router.post('/user', async (req, res) => {
        try {
            await modelApi.create(req.body);
            handleSuccess(res, 'add');
        } catch (e) {
            handleError(res, e);
        }
    });

    router.put('/user/:id', async (req, res) => {
        try {
            await modelApi.update(req.params.id, req.body);
            handleSuccess(res, 'update');
        } catch (e) {
            handleError(res, e);
        }
    });

    router.delete('/user/:id', async (req, res) => {
        try {
            await modelApi.remove(req.params.id);
            handleSuccess(res, 'remove');
        } catch (e) {
            handleError(res, e);
        }
    });
};
