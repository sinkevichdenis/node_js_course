import { DataTypes, Op } from 'sequelize';
import { MESSAGES } from '../const';
import config from '../config';
import { User, UserGroup } from '../data_access';

const errorNotFoundMsg = MESSAGES.errors.notFound;
const permissionTypes = config.get('permissionTypes');
const { groups: groupsTableName } = config.get('tableNames');

export const defineGroupModel = sequelize => {
    const Group = sequelize.define(groupsTableName, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        permissions: {
            type: DataTypes.ENUM(...permissionTypes),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

    Group.getAll = async (substring, limit) => {
        const result = await Group.findAll({
            include: [{
                model: UserGroup,
                attributes: ['id'],
                include: [{
                    model: User
                }]
            }],
            where: {
                name: {
                    [Op.substring]: substring
                }
            },
            order: [
                ['name', 'ASC']
            ],
            limit
        });
        return { groups: result };
    };

    Group.getOneById = async (id) => {
        const result = await Group.findOne({
            include: [{
                model: UserGroup,
                attributes: ['id'],
                include: [{
                    model: User
                }]
            }],
            where: { id }
        });
        if (result) {
            return { groups: result, hasGroup: !!result };
        }
        throw new ReferenceError(errorNotFoundMsg);
    };

    Group.updateOneById = async (data, id) => {
        const result = await Group.update({ ...data }, { where: { id } });
        if (!result[0]) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    Group.removeOneById = async (id) => {
        const result = await Group.destroy({ where: { id } });
        result[0] && await UserGroup.destroyAssociations(groupsTableName, id);
        if (!result) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    /*  Group.associate = () => {
        Group.hasMany(UserGroup, {foreignKey: 'group_id', sourceKey: 'id'});
        Group.belongsToMany(User, {through: UserGroup, foreignKey: 'group_id'});
    }; */

    return Group;
};
