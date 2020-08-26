import { Router } from 'express';
import { handleError } from '../utils';
import { getUser, getAutoSuggestUsers, removeUser, updateUser, addUser } from '../store/store';

export const router = Router();

router.get('/list', (req, res) =>  {
    const substring = req.query.substr || '';
    const limit = parseInt(req.query.limit || 10, 10);
    try {
        res.status(201).json({ message: 'User list loaded', users: getAutoSuggestUsers(substring, limit) });
    } catch (e) {
        handleError(res, e);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        res.status(user ? 201 : 400).json({
            user,
            hasUser: !!user,
            message: user ? 'User found' : 'User does not exist'
        });
    } catch (e) {
        handleError(res, e);
    }
});

router.post('/user', async (req, res) =>  {
    try {
        const isCompleted = await addUser(req.body);
        res.status(isCompleted ? 201 : 400).json({ message: isCompleted ? 'User added' : 'User does not exist'  });
    } catch (e) {
        handleError(res, e);
    }
});

router.put('/user/:id', async (req, res) =>  {
    try {
        const isCompleted = await updateUser(req.params.id, req.body);
        res.status(isCompleted ? 201 : 400).json({ message: isCompleted ? 'User updated' : 'User does not exist'  });
    } catch (e) {
        handleError(res, e);
    }
});

router.delete('/user/:id', async (req, res) =>  {
    try {
        const isCompleted = await removeUser(req.params.id);
        res.status(isCompleted ? 201 : 400).json({ message: isCompleted ? 'User deleted' : 'User does not exist'  });
    } catch (e) {
        handleError(res, e);
    }
});
