import { Sequelize } from 'sequelize';

export const handleError = (res, e) => {
    const messages = {};
    if (e instanceof Sequelize.ValidationError) {
        e.errors.forEach((error) => {
            let message;
            switch (error.validatorKey) {
                case 'is_null':
                    message = 'Necessary use value instead of NULL';
                    break;
                case 'min':
                    message = `Use a number greater or equal to ${  error.validatorArgs[0]}`;
                    break;
                case 'max':
                    message = `Use a number less or equal to ${  error.validatorArgs[0]}`;
                    break;
                case 'isInt':
                    message = 'Please use an integer number';
                    break;
                case 'is':
                    message = 'Value involves abbandoned symboles';
                    break;
                case 'notEmpty':
                    message = 'Value is required';
                    break;
                case 'not_unique':
                    message = `${error.path  } already exists. Please choose another one`;
                    break;
                default:
                    message = 'Unknown validation error';
            }
            messages[error.path] = message;
        });
        res.status(400).json({ message: messages });
    } else {
        res.status(500).json({ message: e.message });
    }
};

