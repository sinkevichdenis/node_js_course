import {Router} from 'express';
import {addUserSchema, updateUserSchema, removeUserSchema} from '../schemas/user.schema';
import {getLoginMatch, handleError} from '../utils';

export const router = Router();

let store = {};

router.get('/list', (req, res) =>  {
    try {
        res.status(201).json({message: 'User list loaded', users: Object.values(store)});
    } catch (e) {
        handleError(res, e);
    };
});

router.post('/', async (req, res) =>  {
    try {
        const {id, login} = req.body;
        await addUserSchema.validateAsync(req.body);
        const match = getLoginMatch(store, login);
        if (!match) {
            store[id] = {...req.body};
            res.status(201).json({message: 'User added'});
        } else {
            res.status(400).json({message: 'User already exist'});
        }
    } catch (e) {
        handleError(res, e);
    };
});

router.put('/', async (req, res) =>  {
    try {
        const {login} = req.body;
        await updateUserSchema.validateAsync(req.body);
        const match = getLoginMatch(store, login);
        if (match) {
            store[match.id] = {...req.body, id: match.id};
            res.status(201).json({message: 'User updated'});
        } else {
            res.status(400).json({message: 'User does not exist'});
        }
    } catch (e) {
        handleError(res, e);
    };
});

router.delete('/', async (req, res) =>  {
    try {
        const {login} = req.body;
        await removeUserSchema.validateAsync(req.body);
        const match = getLoginMatch(store, login);
        if (match) {
            store[match.id] = {...store[match.id], isDeleted: true};
            res.status(201).json({message: 'User deleted'});
        } else {
            res.status(400).json({message: 'User does not exist'});
        }
    } catch (e) {
        handleError(res, e);
    };
});
