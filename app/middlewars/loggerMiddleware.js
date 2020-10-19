import { createLogger, transports, format } from 'winston';

const formatConfig = format.combine(format.timestamp(), format.json(), format.prettyPrint());

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            options: { flags: 'w' },
            format: formatConfig
        }),
        new transports.File({
            filename: 'errors.log',
            level: 'error',
            options: { flags: 'w' },
            format: formatConfig
        })
    ]
});

export const logInfoHandler = (req, res) => {
    logger.info({
        service: req.route?.path,
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
        id: req.params.id,
        response: {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage
        }
    });
};

export const logErrorHandler = (err, req = {}) => {
    logger.error({
        service: req.route?.path,
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
        message: err.message,
        stack: err.stack
    });
};

export const loggerMiddleware = (req, res, next) => {
    res.on('finish', () => logInfoHandler(req, res));
    next();
};
