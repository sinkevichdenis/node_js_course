import uuid from 'react-uuid';
import { User } from '../data_access';
import { Op } from 'sequelize';
import { MESSAGES } from '../const';

const errorNotFoundMsg = MESSAGES.errors.notFound;
const getMatchById = async (id) => await User.findByPk(id);

export const getUserList = async (substring = '', limit = 10) => (
    User.findAll({
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

export const getUser = async (id) => {
    const user = await getMatchById(id);
    if (user && !user.is_deleted) {
        return user;
    }
    throw new ReferenceError(errorNotFoundMsg);
};

export const addUser = async (user) => {
    await User.create({ ...user, id: uuid() });
};

export const updateUser = async (id, user) => {
    const hasMatch = await getMatchById(id);
    if (hasMatch) {
        await User.update({ ...user }, { where: { id } });
    } else {
        throw new ReferenceError(errorNotFoundMsg);
    }
};

export const removeUser = async (id) => {
    const hasMatch = await getMatchById(id);
    if (hasMatch) {
        await User.update({ is_deleted: true }, { where: { id } });
    } else {
        throw new ReferenceError(errorNotFoundMsg);
    }
};
