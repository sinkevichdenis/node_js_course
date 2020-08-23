import Joi from '@hapi/joi';

export const addUserSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('[a-zA-Z0-9]')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
});

export const updateUserSchema = Joi.object({
    id: Joi.any(),
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('[a-zA-Z0-9]')),
    age: Joi.number().integer().min(4).max(130),
    isDeleted: Joi.boolean(),
});

export const removeUserSchema = Joi.object({
    id: Joi.any(),
    login: Joi.string().required(),
    password: Joi.any(),
    age: Joi.any(),
    isDeleted: Joi.any(),
});
