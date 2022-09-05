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
    const rechargeSum = await rechargeRepository.getRechargeSumById(cardId);
    const paymentSum = await paymentRepository.getPaymentSumById(cardId);
    const balance = rechargeSum - paymentSum;


    return {
        balance: balance,
        transactions: getTransactions,
        recharges: getRecharges
    }
}

