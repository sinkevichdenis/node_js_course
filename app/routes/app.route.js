import { Router } from 'express';
import { handleError, handleSuccess } from '../services/feedbacks.service';
import { getUser, getUserList, removeUser, updateUser, addUser } from '../services/users.service';

export const router = Router();

router.get('/list', async (req, res) =>  {
    const substring = req.query.substr || '';
    const limit = parseInt(req.query.limit || 10, 10);
    try {
        const users = await getUserList(substring, limit);
        handleSuccess(res, 'listLoad', { users });
    } catch (e) {
        handleError(res, e);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        handleSuccess(res, 'get', { user, hasUser: !!user });
    } catch (e) {
        handleError(res, e);
    }
});

router.post('/user', async (req, res) =>  {
    try {
        await addUser(req.body);
        handleSuccess(res, 'add');
    } catch (e) {
        handleError(res, e);
    }
});

router.put('/user/:id', async (req, res) =>  {
    try {
        await updateUser(req.params.id, req.body);
        handleSuccess(res, 'update');
    } catch (e) {
        handleError(res, e);
    }
});

router.delete('/user/:id', async (req, res) =>  {
    try {
        await removeUser(req.params.id);
        handleSuccess(res, 'remove');
    } catch (e) {
        handleError(res, e);
    }
});
