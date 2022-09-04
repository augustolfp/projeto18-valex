import { Request, Response } from "express";
import * as cardCreationServices from '../services/cardCreationService';
import * as cardActivationServices from "../services/cardActivationService";

export async function createCard(req: Request, res: Response) {
    
    const { employeeId, cardType } = req.body;


    try{
        const result = await cardCreationServices.createCard(employeeId, cardType);
        return res.status(201).send(result);
    }
    catch(error: any) {
        console.log(error);
        if(error.type === "error_user_nonexistent") {
            return res.status(404).send(error.message);
        }

        if(error.type === "error_database") {
            return res.status(500).send(error);
        }

        if(error.type === "error_user_have_similar_card") {
            return res.status(403).send(error.message);
        }

        return res.sendStatus(500);
    }
}

export async function activateCard(req: Request, res: Response) {

    const { cardNumber, CVV, cardholderName, expirationDate, password } = req.body;

    try{
        const result = await cardActivationServices.activateCard(cardNumber, CVV, cardholderName, expirationDate, password);
        return res.status(201).send(result);
    }
    catch(error: any) {
        if(error.type === "error_card_not_found") {
            return res.status(404).send(error.message);
        }
        if(error.type === "error_database") {
            return res.status(500).send(error);
        }
        if(error.type === "error_expired_card") {
            return res.status(403).send(error.message);
        }
        return res.sendStatus(500);
    }
}