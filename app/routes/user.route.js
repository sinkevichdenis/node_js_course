import { connectModel, handleSuccess } from '../services';
import { restMiddleware } from '../middlewars';

export const connectRoutes = (prefix, model, router) => {
    const middleware =  restMiddleware(model);

    router.get(`${prefix}/list`, middleware.getList);
    router.get(`${prefix}/:id`, middleware.get);
    router.post(prefix, middleware.post);
    router.put(`${prefix}/:id`, middleware.put);
    router.delete(`${prefix}/:id`, middleware.remove);
};
