import { Request, Response } from "express";
import * as cardCreationServices from '../services/cardCreationService';
import * as cardActivationServices from "../services/cardActivationService";
import * as cardBlockServices from "../services/cardBlockServices";
import * as cardStatsService from "../services/cardStatsService";
import * as cardRechargeService from "../services/cardRechargeService";

export async function createCard(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;

    const result = await cardCreationServices.createCard(employeeId, cardType);
    return res.status(201).send(result);
}

export async function activateCard(req: Request, res: Response) {
    const { cardNumber, CVV, cardholderName, expirationDate, password } = req.body;

    const result = await cardActivationServices.activateCard(cardNumber, CVV, cardholderName, expirationDate, password);
    return res.status(201).send(result);
}

export async function blockCard(req: Request, res: Response) {
    const { id, password} = req.body;

    const result = await cardBlockServices.blockCard(id, password);
    return res.status(201).send(result);
}

export async function unblockCard(req: Request, res: Response) {
    const {id, password} = req.body;

    const result = await cardBlockServices.unblockCard(id, password);
    res.status(201).send(result);
}

export async function cardStats(req: Request, res: Response) {
    const {cardId} = req.body;
    
    const result = await cardStatsService.getCardStats(cardId);
    return res.status(200).send(result);
}

export async function rechargeCard(req: Request, res: Response) {
    const {cardId, amount} = req.body;

    const result = await cardRechargeService.rechargeCard(cardId, amount);
    return res.status(201).send(result);
}