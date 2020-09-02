import { Sequelize } from 'sequelize';
import { MESSAGES } from '../const';

export const handleError = (res, e) => {
    const messages = {};
    let status;

    if (e instanceof ReferenceError) {
        status = 404;
        messages.notFound = e.message;
    }

    if (e instanceof Sequelize.ValidationError) {
        status = 400;
        e.errors.forEach(error => {
            const errMessages = MESSAGES.errors;
            let message;
            switch (error.validatorKey) {
                case 'min':
                case 'max':
                    message = `${errMessages[error.validatorKey]} ${error.validatorArgs[0]}`;
                    break;
                case 'not_unique':
                    message = `${error.path} ${errMessages[error.validatorKey]}`;
                    break;
                default:
                    message = errMessages[error.validatorKey];
            }
            messages[error.path] = message;
        });
    }

    if (!Object.values(messages).length) {
        status = 500;
        messages.server = e.message;
    }

    res.status(status).json({ messages: { errors: messages } });
};

export const handleSuccess = (res,  msgKey = 'default', body = {}) => {
    const message = MESSAGES.success;
    res.status(201).json({ messages: { success: message[msgKey] }, ...body });
};
