import { DataTypes, Op } from 'sequelize';
import { MESSAGES } from '../const';

const errorNotFoundMsg = MESSAGES.errors.notFound;

export const defineUserModel = sequelize => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[a-zA-Z0-9]+$/i,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9]+$/i,
                notEmpty: true
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 4,
                max: 130,
                notEmpty: true,
                isInt: true
            }
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    User.getOneById = async (id) => {
        const result = await User.findOne({
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
        if (result) {
            return result;
        }
        throw new ReferenceError(errorNotFoundMsg);
    };

    User.getAll = async (substring, limit) => await User.findAll({
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
    });

    User.updateOneById = async (data, id) => {
        const result = await User.update({ ...data }, { where: { id } });
        if (!result[0]) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    User.removeOneById = async (id) => {
        const result = await User.update({ is_deleted: true }, { where: { id } });
        if (!result[0]) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    return User;
};
