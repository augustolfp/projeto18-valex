import { Request, Response } from "express";
import * as cardServices from '../services/cardService';

export async function createCard(req: Request, res: Response) {
    
    const { employeeId, cardType } = req.body;


    try{
        const result = await cardServices.createCard(employeeId, cardType);
        return res.status(204).send(result);
    }
    catch(error) {
        return res.sendStatus(420);
    }
}