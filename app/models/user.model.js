import { DataTypes, Op } from 'sequelize';
import { MESSAGES } from '../const';
import config from '../config';
import { Group, UserGroup } from '../data_access';

const errorNotFoundMsg = MESSAGES.errors.notFound;
const { users: usersTableName } = config.get('tableNames');

export const defineUserModel = sequelize => {
    const User = sequelize.define(usersTableName, {
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
            },
            include: [{
                model: UserGroup,
                attributes: ['id'],
                include: [{
                    model: Group
                }]
            }]

        /*    const includeConditions = [{
                model: UserGroup,
                include: [{
                    model: Group
                }]
            }]; */
            // include: includeConditions  doesn't work. Why?
        });
        if (result) {
            return { user: result, hasUser: !!result };
        }
        throw new ReferenceError(errorNotFoundMsg);
    };

    User.getAll = async (substring, limit) => {
        const result = await User.findAll({
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
            limit,
            include: [{
                model: UserGroup,
                attributes: ['id'],
                include: [{
                    model: Group
                }]
            }]
        });
        return { users: result };
    };

    User.updateOneById = async (data, id) => {
        const result = await User.update({ ...data }, { where: { id } });
        if (!result[0]) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    User.removeOneById = async (id) => {
        const result = await User.update({ is_deleted: true }, { where: { id } });
        result[0] && await UserGroup.destroyAssociations(usersTableName, id);
        if (!result[0]) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    /*  User.associate = () => {
       User.hasMany(UserGroup, {foreignKey: 'user_id', sourceKey: 'id'});
       User.belongsToMany(Group, {through: UserGroup, foreignKey: 'user_id'});
    }; */

    return User;
};
