import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";

export async function insertPurchase(req: Request, res: Response) {
    const {cardId, cardPassword, businessId, amount} = req.body;

    try{
        const result = await purchaseService.makePurchase(cardId, cardPassword, businessId, amount);
        return res.status(201).send(result);
    }
    catch(error: any) {
        if(error.type === "error_business_not_found") {
            return res.status(404).send(error.message);
        }
        if(error.type === "error_incompatible_types") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_card_not_found") {
            return res.status(404).send(error.message);
        }
        if(error.type === "error_card_not_active") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_expired_card") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_is_blocked") {
            return res.status(403).send(error.message);
        }
        if(error.type === "error_wrong_password") {
            return res.status(401).send(error.message);
        }
        if(error.type === "error_database") {
            return res.status(500).send(error.message);
        }
        return res.sendStatus(500);
    }
}