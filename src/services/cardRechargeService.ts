import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardRepository from "../repositories/cardRepository";
import dayjs from "dayjs";

export async function rechargeCard(cardId: number, amount: number) {

    const checkCard = await cardRepository.findById(cardId);

    if(checkCard === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }

    if(!checkCard.password) {
        throw {type: "error_card_not_active", message: "Esse cartão não está ativo!"};
    }

    function isCardExpired(expirationDate: string): boolean {
        const month = expirationDate.split("/")[0];
        const year = "20" + expirationDate.split("/")[1];

        return dayjs().isAfter(`${year}-${month}-01`, 'month');
    }

    if(isCardExpired(checkCard.expirationDate)) {
        throw {type: "error_expired_card", message: "Esse cartão já expirou!"};
    }

    try{
        await rechargeRepository.insert({cardId, amount});
        return "Cartão recarregado com sucesso!";
    }
    catch(error) {
        throw {type: "error_database", message: error};
    }
}