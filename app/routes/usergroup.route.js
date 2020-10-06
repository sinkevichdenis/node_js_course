import { handleSuccess } from '../services';
import { connectUserGroupModel }  from '../services/';

export const connectGroupUserRoutes = (prefix, router) => {
    const modelApi = connectUserGroupModel();

    router.post(`${prefix}/addUsersToGroup`, async (req, res, next) => {
        try {
            await modelApi.addUsersToGroup(req.body);
            handleSuccess(res, 'add');
            return next();
        } catch (e) {
            return next(e);
        }
    });
};
