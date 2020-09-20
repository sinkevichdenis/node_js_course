import { MESSAGES } from '../const';

export const handleSuccess = (res,  msgKey = 'default', body = {}) => {
    const message = MESSAGES.success;
    res.status(200).json({ messages: { success: message[msgKey] }, ...body });
};
