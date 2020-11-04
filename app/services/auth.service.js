import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../data_access';

export const login = async (username, password) => {
    const user = await User.authenticate(username, password);
    const secret = config.get('privateKey');
    return user ? jwt.sign({ userId: user.id }, secret, { expiresIn: 120 }) : null;
};
