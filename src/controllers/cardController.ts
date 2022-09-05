import { Request, Response } from "express";
import * as cardCreationServices from '../services/cardCreationService';
import * as cardActivationServices from "../services/cardActivationService";
import * as cardBlockServices from "../services/cardBlockServices";
import * as cardStatsService from "../services/cardStatsService";

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
            return res.status(500).send(error.message);
        }
        if(error.type === "error_expired_card") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_card_already_active") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_invalid_CVV") {
            return res.status(401).send(error.message);
        }
        return res.sendStatus(500);
    }
}

export async function blockCard(req: Request, res: Response) {
    const { id, password} = req.body;

    try{
        const result = await cardBlockServices.blockCard(id, password);
        res.status(201).send(result);
    }
    catch(error: any) {
        if(error.type === "error_card_not_found") {
            return res.status(404).send(error.message);
        }
        if(error.type === "error_database") {
            return res.status(500).send(error.message);
        }
        if(error.type === "error_expired_card") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_already_blocked") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_wrong_password") {
            return res.status(401).send(error.message);
        }
        return res.sendStatus(500);
    }
}

export async function unblockCard(req: Request, res: Response) {
    const {id, password} = req.body;

    try{
        const result = await cardBlockServices.unblockCard(id, password);
        res.status(201).send(result);
    }
    catch(error: any) {
        if(error.type === "error_card_not_found") {
            return res.status(404).send(error.message);
        }
        if(error.type === "error_database") {
            return res.status(500).send(error.message);
        }
        if(error.type === "error_expired_card") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_already_unblocked") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_wrong_password") {
            return res.status(401).send(error.message);
        }
        return res.sendStatus(500);
    }
}

export async function cardStats(req: Request, res: Response) {
    const {cardId} = req.body;
}