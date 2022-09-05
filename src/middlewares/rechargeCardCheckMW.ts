import { NextFunction, Request, Response } from "express";

export async function verifyAmount(req: Request, res: Response, next: NextFunction) {
    const {amount} = req.body;

    if(amount <=0) {
        return res.status(400).send("Valor de recarga inválido");
    }
    
    next();
}