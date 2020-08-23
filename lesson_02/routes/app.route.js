import {Router} from 'express';

export const router = Router();

let store = {};

router.get('/api', (req, res) =>  {
    try {
        res.status(201).json({message: 'User list loaded', users: Object.values(store)});
    } catch (e) {
        res.status(500).json({message: 'GET not work'});
    };
});

router.post('/', (req, res) =>  {
    try {
        const {id} = req.body;
        if (id) {
            store[id] = {...req.body};
        } else {
            res.status(204).json({message: 'No content'});
        }
        res.status(201).json({message: 'User added'});
        console.log('post', store)
    } catch (e) {
        res.status(500).json({message: 'POST not work'});
    };
});

router.put('/', (req, res) =>  {
    try {
        const {login} = req.body;
        const match = Object.values(store).find(item => item.login === login);
        if (match) {
            store[match.id] = {...req.body, id: match.id};
            res.status(201).json({message: 'User updated'});
        } else {
            res.status(202).json({message: 'User does not exist'});
        }
    } catch (e) {
        res.status(500).json({message: 'PUT not work'});
    };
});

router.delete('/', (req, res) =>  {
    try {
        const {login} = req.body;
        const match = Object.values(store).find(item => item.login === login);
        if (match) {
            store[match.id] = {...store[match.id], isDeleted: true};
            res.status(201).json({message: 'User deleted'});
        } else {
            res.status(202).json({message: 'User does not exist'});
        }
    } catch (e) {
        res.status(500).json({message: 'Delete not work'});
    };
});
