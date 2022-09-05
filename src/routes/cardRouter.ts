import { Router } from "express";
import * as cardController from "../controllers/cardController";
import * as apiKeyVerifierMW from "../middlewares/apiKeyVerifierMW";
import * as cardCreationCheckMW from "../middlewares/cardCreationCheckMW";
import * as rechargeCardCheckMW from "../middlewares/rechargeCardCheckMW";

const cardRouter = Router();

cardRouter.post('/create-card', apiKeyVerifierMW.verifyCompanyApiKey, cardCreationCheckMW.verifyCardCreationBody, cardController.createCard);
cardRouter.post('/activate-card', cardController.activateCard);
cardRouter.post('/block-card', cardController.blockCard);
cardRouter.post('/unblock-card', cardController.unblockCard);
cardRouter.get('/card-stats', cardController.cardStats);
cardRouter.post('/recharge-card', apiKeyVerifierMW.verifyCompanyApiKey, rechargeCardCheckMW.verifyAmount, cardController.rechargeCard);

export default cardRouter;