const Joi = require('joi');


const validator = (schema, property) => {
    return (ctx, next) => {
        const {error} = schema.validate(ctx.request[property]);
        if (error) {
            ctx.status = 400;
            ctx.body = error.details.map(err => err.message).join(', ');
        } else {
            return next();
        }
    };
};


const newsSchema = Joi.object({
    date: Joi.date().iso().required(),
    title: Joi.string().min(3).max(100).required(),
    shortDescription: Joi.string().min(3).max(255).required(),
    text: Joi.string().min(3).required()
});

const querySchema = Joi.object({
    sortBy: Joi.string().valid('date', 'title').optional(),
    sortOrder: Joi.when("sortBy", {
        is: Joi.exist(),
        then: Joi.valid('asc', 'desc').required(),
        otherwise: Joi.forbidden()
    }),
    filterBy: Joi.string().valid('date', 'title').optional(),
    filterValue: Joi.when("filterBy", {
        is: Joi.exist(),
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    }),
});

const paramsSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});


module.exports = {validator, newsSchema, querySchema, paramsSchema};
