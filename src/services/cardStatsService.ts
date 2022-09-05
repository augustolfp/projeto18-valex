import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardRepository from "../repositories/cardRepository";

export async function getCardStats(cardId: number) {

    const checkCard = await cardRepository.findById(cardId);

    if(checkCard === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }

    const getTransactions = await paymentRepository.findByCardId(cardId);
    const getRecharges = await rechargeRepository.findByCardId(cardId);

    return {
        transactions: getTransactions,
        recharges: getRecharges
    }
}

