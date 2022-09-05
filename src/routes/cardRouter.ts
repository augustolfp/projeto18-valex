import { Router } from "express";
import * as cardController from "../controllers/cardController";
import * as apiKeyVerifierMW from "../middlewares/apiKeyVerifierMW";
import * as cardCreationCheckMW from "../middlewares/cardCreationCheckMW";

const cardRouter = Router();

cardRouter.post('/create-card', apiKeyVerifierMW.verifyCompanyApiKey, cardCreationCheckMW.verifyCardCreationBody, cardController.createCard);
cardRouter.post('/activate-card', cardController.activateCard);
cardRouter.post('/block-card', cardController.blockCard);
cardRouter.post('/unblock-card', cardController.unblockCard);

export default cardRouter;