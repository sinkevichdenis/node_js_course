import { DataTypes, Op } from 'sequelize';
import { MESSAGES } from '../const';
import config from '../config';
import { Group, User } from '../data_access';

const errorNotFoundMsg = MESSAGES.errors.notFound;
const { userGroups: generalTableName, users: usersTableName, groups: groupsTableName } = config.get('tableNames');
const associationKeys = config.get('tableAssociationKeys');

export const defineGeneralModel = sequelize => {
    const UserGroup = sequelize.define(generalTableName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        [associationKeys[usersTableName]]: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: usersTableName,
                key: 'id'
            }
        },
        [associationKeys[groupsTableName]]: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: groupsTableName,
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

    UserGroup.getAll = async () => {
        const result = await UserGroup.findAll({
            attributes: ['id'],
            include: [{
                model: User
            }, {
                model: Group
            }],
            order: [
                ['id', 'ASC']
            ]
        });
        return { data: result };
    };

    UserGroup.getOneById = async (id) => {
        const result = await UserGroup.findOne({
            where: { id },
            attributes: ['id'],
            include: [{
                model: User
            }, {
                model: Group
            }]
        });
        if (result) {
            return { data: result };
        }
        throw new ReferenceError(errorNotFoundMsg);
    };

    UserGroup.updateOneById = async (data, id) => {
        const result = await UserGroup.update({ ...data }, { where: { id } });
        if (!result[0]) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    UserGroup.removeOneById = async (id) => {
        const result = await UserGroup.destroy({ where: { id } });
        if (!result) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    UserGroup.destroyAssociations = async (tableName, id) => {
        await UserGroup.destroy({
            where: { [associationKeys[tableName]]: id }
        });
    };

    UserGroup.addUsersToGroup = async (groupId, userIds) => {
        const transaction = await sequelize.transaction();
        try {
            const promisesArray = userIds.map(userId => {
                return User.findOne({ where: {
                    [Op.and]: [{
                        id: {
                            [Op.eq]: userId
                        }
                    }, {
                        is_deleted: {
                            [Op.eq]: false
                        }
                    }]
                } }, { transaction })
                    .then(user => {
                        console.log('user', user);
                        if (!user) {
                            return Promise.reject();
                        }
                        return UserGroup.create({
                            [associationKeys[usersTableName]]: userId,
                            [associationKeys[groupsTableName]]: groupId
                        }, { transaction });
                    });
            });

            await Promise.all(promisesArray);
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
        }
    };

    UserGroup.associate = () => {
        UserGroup.belongsTo(User, { foreignKey: 'user_id' });
        UserGroup.belongsTo(Group, { foreignKey: 'group_id' });
    };

    return UserGroup;
};
