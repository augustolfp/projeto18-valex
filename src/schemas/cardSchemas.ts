import joi from "joi";

export const cardCreationSchema = joi.object({
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
    employeeId: joi.number().required()
});

export const cardPasswordSchema = joi.object({
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
})