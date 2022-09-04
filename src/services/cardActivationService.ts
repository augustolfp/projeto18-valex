import * as cardRepository from "../repositories/cardRepository";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export async function activateCard(cardNumber: string, CVV: string, cardholderName: string, expirationDate: string, password: string) {

    const passwordHash = bcrypt.hashSync(password, 10);

    const cardToActivate = await cardRepository.findByCardDetails(cardNumber, cardholderName, expirationDate);

    if(cardToActivate === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }

    try{
        await cardRepository.update(cardToActivate.id, {password: passwordHash});
        return "Cartão ativado com sucesso!";
    }
    catch(error){
        throw {type: "error_database", message: error};
    }

}