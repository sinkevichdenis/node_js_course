import { User } from '../data_access';
import { Op } from 'sequelize';
import { MESSAGES } from '../const';

const errorNotFoundMsg = MESSAGES.errors.notFound;

export const connectApi = model => {
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
        const user = await getMatchById(id);
        if (user) {
            return user;
        }
        throw new ReferenceError(errorNotFoundMsg);
    };

    const add = async (user) => {
        await model.create({ ...user });
    };

    const update = async (id, user) => {
        const hasMatch = await getMatchById(id);
        if (hasMatch) {
            await model.update({ ...user }, { where: { id } });
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
        add,
        update,
        remove
    }
};
