import { Router } from 'express';
import { handleError } from '../services/error.service';
import { getUser, getUserList, removeUser, updateUser, addUser } from '../services/user.service';

export const router = Router();

router.get('/list', async (req, res) =>  {
    const substring = req.query.substr || '';
    const limit = parseInt(req.query.limit || 10, 10);
    try {
        const users = await getUserList(substring, limit);
        res.status(201).json({ message: 'User list loaded', users });
    } catch (e) {
        handleError(res, e);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        res.status(201).json({
            user,
            hasUser: !!user,
            message: 'User found'
        });
    } catch (e) {
        handleError(res, e);
    }
});

router.post('/user', async (req, res) =>  {
    try {
        await addUser(req.body);
        res.status(201).json({ message: 'User added' });
    } catch (e) {
        handleError(res, e);
    }
});

router.put('/user/:id', async (req, res) =>  {
    try {
        await updateUser(req.params.id, req.body);
        res.status(201).json({ message: 'User updated' });
    } catch (e) {
        handleError(res, e);
    }
});

router.delete('/user/:id', async (req, res) =>  {
    try {
        await removeUser(req.params.id);
        res.status(201).json({ message: 'User deleted' });
    } catch (e) {
        handleError(res, e);
    }
});
