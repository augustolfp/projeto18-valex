import * as cardRepository from "../repositories/cardRepository";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

dotenv.config();

export async function activateCard(cardNumber: string, CVV: string, cardholderName: string, expirationDate: string, password: string) {

    const passwordHash = bcrypt.hashSync(password, 10);

    const cardToActivate = await cardRepository.findByCardDetails(cardNumber, cardholderName, expirationDate);

    if(cardToActivate === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }

    function isCardExpired(expirationDate: string): boolean {
        const month = expirationDate.split("/")[0];
        const year = "20" + expirationDate.split("/")[1];

        return dayjs().isAfter(`${year}-${month}-01`, 'month');
    }

    if(isCardExpired(expirationDate)) {
        throw {type: "error_expired_card", message: "Esse cartão já expirou!"};
    }

    if(cardToActivate.password) {
        throw {type: "error_card_already_active", message: "Esse cartão já foi ativado!"};
    }

    try{
        await cardRepository.update(cardToActivate.id, {password: passwordHash});
        return "Cartão ativado com sucesso!";
    }
    catch(error){
        throw {type: "error_database", message: error};
    }

}