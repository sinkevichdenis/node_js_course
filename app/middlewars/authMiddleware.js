export const authMiddleware = (req, res, next) => {
    console.log('READY????????????');
    if ( req.path === '/login') return next();
    console.log('STOP');
    next();
};
