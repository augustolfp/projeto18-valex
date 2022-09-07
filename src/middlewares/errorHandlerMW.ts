import { NextFunction, Request, Response } from "express";

const ERRORS = {
    error_invalid_CVV: 401,
    error_wrong_password: 401,
    error_user_have_similar_card: 403,
    error_invalid_password: 403,
    error_expired_card: 403,
    error_card_already_active: 403,
    error_already_blocked: 403,
    error_already_unblocked: 403,
    error_card_not_active: 403,
    error_incompatible_types: 403,
    error_user_nonexistent: 404,
    error_business_not_found: 404,
    error_card_not_found: 404,
    error_database: 500

}

export default function errorHandlerMW(err, req: Request, res: Response, next: NextFunction) {
    const type: string = err.type;
    let statusCode = ERRORS[type];
    if(!statusCode) {
        statusCode = 500;
        return res.sendStatus(500);
    }
    return res.status(statusCode).send(err.message);
}