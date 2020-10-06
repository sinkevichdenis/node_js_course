import { Sequelize } from 'sequelize';
import { MESSAGES } from '../const';
import { logErrorHandler } from './loggerMiddleware';

export const errorMiddleware = (err, req, res, next) => {
    const messages = {};
    let status;

    if (err instanceof ReferenceError) {
        status = 404;
        messages.notFound = err.message;
    }

    if (err instanceof Sequelize.ValidationError) {
        status = 400;
        err.errors.forEach(error => {
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
        messages.server = err.message;
    }

    res.status(status).json({ messages: { errors: messages } });

    logErrorHandler(err, req);
    next();
};
