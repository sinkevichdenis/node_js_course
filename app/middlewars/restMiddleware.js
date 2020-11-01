import { handleSuccess } from '../services';

export const restMiddleware = model => {
    const getList = async (req, res, next) => {
        const substring = req.query.substr || '';
        const limit = parseInt(req.query.limit || 10, 10);
        try {
            const result = await model.getList(substring, limit);
            handleSuccess(res, 'listLoad', result);
            return next();
        } catch (e) {
            return next(e);
        }
    };

    const get = async (req, res, next) => {
        try {
            const result = await model.get(req.params.id);
            handleSuccess(res, 'get', result);
            return next();
        } catch (e) {
            return next(e);
        }
    };

    const post = async (req, res, next) => {
        try {
            await model.create(req.body);
            handleSuccess(res, 'add');
            return next();
        } catch (e) {
            return next(e);
        }
    };

    const put =  async (req, res, next) => {
        try {
            await model.update(req.params.id, req.body);
            handleSuccess(res, 'update');
            return next();
        } catch (e) {
            return next(e);
        }
    };

    const remove = async (req, res, next) => {
        try {
            await model.remove(req.params.id);
            handleSuccess(res, 'remove');
            return next();
        } catch (e) {
            return next(e);
        }
    };

  return {
      getList,
      get,
      post,
      put,
      remove,
  }
};
