import { Router } from "express";
import * as cardController from "../controllers/cardController";
import * as apiKeyVerifierMW from "../middlewares/apiKeyVerifierMW";

const cardRouter = Router();

cardRouter.post('/create-card', apiKeyVerifierMW.verifyCompanyApiKey, cardController.createCard);

export default cardRouter;