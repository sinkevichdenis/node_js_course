import { DataTypes, Op } from "sequelize";
import { MESSAGES } from "../const";
import config from "../config";

const errorNotFoundMsg = MESSAGES.errors.notFound;
const groupTableName = config.get("tableNames").groups;
const permissionTypes = config.get("permissionTypes");

export const defineGroupModel = sequelize => {
    const Group = sequelize.define(groupTableName, {
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
            where: {
                name: {
                    [Op.substring]: substring
                }
            },
            order: [
                ["name", "ASC"]
            ],
            limit
        });
        return { groups: result };
    };

    Group.getOneById = async (id) => {
        const result = await Group.findOne({ where: { id } });
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
        if (!result) {
            throw new ReferenceError(errorNotFoundMsg);
        }
    };

    return Group;
};
