import { addUserSchema, removeUserSchema, updateUserSchema } from './schemas/user.schema';

const validationSchemaMap = {
    add: addUserSchema,
    update: updateUserSchema,
    remove: removeUserSchema
};

export const validateUser = async (type, user) => await validationSchemaMap[type].validateAsync(user);
