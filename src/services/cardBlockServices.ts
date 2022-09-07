import * as cardRepository from "../repositories/cardRepository";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function blockCard(cardId: number, cardPassword: string) {

    const cardToBlock = await cardRepository.findById(cardId);

    if(cardToBlock === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }

    if(!bcrypt.compareSync(cardPassword, cardToBlock.password!)) {
        throw {type: "error_wrong_password", message: "Senha incorreta!"};
    }

    function isCardExpired(expirationDate: string): boolean {
        const month = expirationDate.split("/")[0];
        const year = "20" + expirationDate.split("/")[1];

        return dayjs().isAfter(`${year}-${month}-01`, 'month');
    }

    if(isCardExpired(cardToBlock.expirationDate)) {
        throw {type: "error_expired_card", message: "Esse cartão já expirou!"};
    }

    if(cardToBlock.isBlocked) {
        throw {type: "error_already_blocked", message: "O cartão já está bloqueado!"};
    }

    await cardRepository.update(cardId, {isBlocked: true});
    return "Cartão bloqueado com sucesso!";
}

export async function unblockCard(cardId: number, cardPassword: string) {

    const cardToUnblock = await cardRepository.findById(cardId);

    if(cardToUnblock === undefined) {
        throw {type: "error_card_not_found", message: "Cartão não foi encontrado no banco de dados!"};
    }
    
    if(!bcrypt.compareSync(cardPassword, cardToUnblock.password!)) {
        throw {type: "error_wrong_password", message: "Senha incorreta!"};
    }

    function isCardExpired(expirationDate: string): boolean {
        const month = expirationDate.split("/")[0];
        const year = "20" + expirationDate.split("/")[1];

        return dayjs().isAfter(`${year}-${month}-01`, 'month');
    }

    if(isCardExpired(cardToUnblock.expirationDate)) {
        throw {type: "error_expired_card", message: "Esse cartão já expirou!"};
    }

    if(!cardToUnblock.isBlocked) {
        throw {type: "error_already_unblocked", message: "O cartão já está desbloqueado!"};
    }

    await cardRepository.update(cardId, {isBlocked: false});
    return "Cartão desbloqueado com sucesso!";

}