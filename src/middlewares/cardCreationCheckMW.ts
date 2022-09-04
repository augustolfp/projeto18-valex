import { NextFunction, Request, Response } from "express";
import * as cardSchemas from '../schemas/cardSchemas';

export async function verifyCardCreationBody(req: Request, res: Response, next: NextFunction) {
    const validation = cardSchemas.cardCreationSchema.validate(req.body);

    if(validation.error) {
        return res.status(400).send(validation.error.details);
    }

    next();
}