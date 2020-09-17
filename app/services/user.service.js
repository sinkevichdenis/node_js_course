export const connectModel = model => {
    const getList = async (substring = "", limit = 10) => await model.getAll(substring, limit);
    const get = async (id) => await model.getOneById(id);
    const create = async (data) => await model.create({ ...data });
    const update = async (id, data) => await model.updateOneById(data, id);
    const remove = async (id) => await model.removeOneById(id);

    return {
        getList,
        get,
        create,
        update,
        remove
    };
};
