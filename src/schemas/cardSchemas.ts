import joi from "joi";

export const cardCreationSchema = joi.object({
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
    employeeId: joi.number().required()
});