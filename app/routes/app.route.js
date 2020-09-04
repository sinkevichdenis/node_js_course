import { Router } from 'express';
import { handleError, handleSuccess } from '../services/feedbacks.service';
import { connectApi } from '../services/api.service';
import { User } from "../data_access";

export const router = Router();
const UserApi = connectApi(User);

router.get('/list', async (req, res) =>  {
    const substring = req.query.substr || '';
    const limit = parseInt(req.query.limit || 10, 10);
    try {
        const users = await UserApi.getList(substring, limit);
        handleSuccess(res, 'listLoad', { users });
    } catch (e) {
        handleError(res, e);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await UserApi.get(req.params.id);
        handleSuccess(res, 'get', { user, hasUser: !!user });
    } catch (e) {
        handleError(res, e);
    }
});

router.post('/user', async (req, res) =>  {
    try {
        await UserApi.add(req.body);
        handleSuccess(res, 'add');
    } catch (e) {
        handleError(res, e);
    }
});

router.put('/user/:id', async (req, res) =>  {
    try {
        await UserApi.update(req.params.id, req.body);
        handleSuccess(res, 'update');
    } catch (e) {
        handleError(res, e);
    }
});

router.delete('/user/:id', async (req, res) =>  {
    try {
        await UserApi.remove(req.params.id);
        handleSuccess(res, 'remove');
    } catch (e) {
        handleError(res, e);
    }
});
