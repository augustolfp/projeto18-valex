import joi from "joi";

export const cardCreationSchema = joi.object({
    cardType: joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required(),
    employeeId: joi.number().required()
});