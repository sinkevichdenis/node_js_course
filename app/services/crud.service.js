import { Op } from 'sequelize';
import { MESSAGES } from '../const';

const errorNotFoundMsg = MESSAGES.errors.notFound;

export const connectModel = model => {
    const getMatchById = async (id) => await model.findOne({
        where: {
            [Op.and]: [{
                id: {
                    [Op.eq]: id
                }
            }, {
                is_deleted: {
                    [Op.eq]: false
                }
            }]
        }
    });

    const getList = async (substring = '', limit = 10) => (
        model.findAll({
            where: {
                [Op.and]: [{
                    login: {
                        [Op.substring]: substring
                    }
                }, {
                    is_deleted: {
                        [Op.eq]: false
                    }
                }]
            },
            order: [
                ['login', 'ASC']
            ],
            limit
        })
    );

    const get = async (id) => {
        const data = await getMatchById(id);
        if (data) {
            return data;
        }
        throw new ReferenceError(errorNotFoundMsg);
    };

    const create = async (data) => {
        await model.create({ ...data });
    };

    const update = async (id, data) => {
        const hasMatch = await getMatchById(id);
        if (hasMatch) {
            await model.update({ ...data }, { where: { id } });
        } else {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    const remove = async (id) => {
        const hasMatch = await getMatchById(id);
        if (hasMatch) {
            await model.update({ is_deleted: true }, { where: { id } });
        } else {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    return {
        getList,
        get,
        create,
        update,
        remove
    }
};
