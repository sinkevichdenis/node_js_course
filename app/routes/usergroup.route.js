import { handleSuccess } from '../services';
import { connectUserGroupModel }  from '../services/';

export const connectGroupUserRoutes = (prefix, router) => {
    const modelApi = connectUserGroupModel();

    router.post(`${prefix}/addUsersToGroup`, async (req, res, next) => {
        try {
            const result = await modelApi.addUsersToGroup(req.body);
            console.log('result', result);
            handleSuccess(res, 'add');
        } catch (e) {
            return next(e);
        }
    });
};
