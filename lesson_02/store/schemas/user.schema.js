import Joi from '@hapi/joi';

const regexpTemplate = new RegExp('[a-zA-Z0-9]');

export const addUserSchema = Joi.object({
    login: Joi.string().pattern(regexpTemplate).required(),
    password: Joi.string().pattern(regexpTemplate).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

export const updateUserSchema = Joi.object({
    login: Joi.string().pattern(regexpTemplate).required(),
    password: Joi.string().pattern(regexpTemplate).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});

export const removeUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.any(),
    age: Joi.any(),
    isDeleted: Joi.any()
});
