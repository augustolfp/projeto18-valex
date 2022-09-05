import * as rechargeRepository from "../repositories/rechargeRepository";

export async function rechargeCard(cardId: number, amount: number) {

    try{
        const recharge = await rechargeRepository.insert({cardId, amount});
        return "Cartão recarregado com sucesso!";
    }
    catch(error) {
        throw {type: "error_database", message: error};
    }
}