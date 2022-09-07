import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";

export async function insertPurchase(req: Request, res: Response) {
    const {cardId, cardPassword, businessId, amount} = req.body;

    const result = await purchaseService.makePurchase(cardId, cardPassword, businessId, amount);
    return res.status(201).send(result);
}