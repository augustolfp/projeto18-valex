import * as cardRepository from "../repositories/cardRepository";
import bcrypt from "bcrypt";

export async function blockCard(cardId: number, cardPassword: string) {

    const cardToBlock = await cardRepository.findById(cardId);

    if(cardToBlock === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }

    try{
        await cardRepository.update(cardId, {isBlocked: true});
        return "Cartão bloqueado com sucesso!";
    }
    catch(error) {
        throw {type: "error_database", message: error};
    }
}