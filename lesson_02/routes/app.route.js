import {Router} from 'express';

export const router = Router();

router.post('/',  async (req, res) =>  {
    try {
        const {login, age, password} = req.body;

        res.status(201).json({message: 'User added'})
    } catch (e) {
        res.status(500).json({message: 'Post not work'})
    };
});
