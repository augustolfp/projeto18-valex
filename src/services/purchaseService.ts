import * as paymentRepository from "../repositories/paymentRepository";
import * as cardRepository from "../repositories/cardRepository";
import * as businessRepository from "../repositories/businessRepository";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export async function makePurchase(cardId: number, cardPassword: string, businessId: number, amount: number) {

    const checkCard = await cardRepository.findById(cardId);
    const checkBusiness = await businessRepository.findById(businessId);

    if(checkBusiness === undefined) {
        throw {type: "error_business_not_found", message: "Estabelecimento não encontrado!"};
    }

    if(checkCard === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }

    if(checkBusiness.type !== checkCard.type) {
        throw {type: "error_incompatible_types", message: "O estabelecimento e o cartão são de tipos diferentes!"};
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

    if(checkCard.isBlocked) {
        throw {type: "error_is_blocked", message: "O cartão está bloqueado!"};
    }

    if(!bcrypt.compareSync(cardPassword, checkCard.password!)) {
        throw {type: "error_wrong_password", message: "Senha incorreta!"};
    }

    await paymentRepository.insert({cardId, businessId, amount});
    return "Pagamento registrado com sucesso!";
}