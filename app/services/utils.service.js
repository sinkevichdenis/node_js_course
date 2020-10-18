import { MESSAGES } from '../const';
import { User } from '../data_access';
import jwt from 'jsonwebtoken';
import config from '../config';

export const handleSuccess = (res,  msgKey = 'default', body = {}) => {
    const message = MESSAGES.success;
    res.status(200).json({ messages: { success: message[msgKey] }, ...body });
};

export const login = async (login, password) => {
    let user = await User.authenticate(login, password);
    const secret = config.get('privateKey');
    return user ? jwt.sign({userId: user.id}, secret, {expiresIn: 120}) : null;
};
