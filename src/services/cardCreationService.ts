import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import dayjs from "dayjs";

dotenv.config();

export async function createCard(employeeId: number, cardType: cardRepository.TransactionTypes ) {

    const cryptr = new Cryptr(process.env.CRYPTR_KEY!);
    const encryptedCVV: string = cryptr.encrypt(faker.finance.creditCardCVV());

    const employeeData = await employeeRepository.findById(employeeId);

    if(employeeData === undefined) {
        throw {type: "error_user_nonexistent", message: "Funcionário não encontrado"};
    }

    const searchSimilarCard = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);

    if(searchSimilarCard !== undefined) {
        throw {type: "error_user_have_similar_card", message: "Usuário já possui um cartão do tipo especificado!"};
    }

    function generateCardHolderName(employeeData: any){
        const splitName = employeeData.fullName.split(" ");
        let cardHolderName = "";
        cardHolderName += splitName[0].toUpperCase() + " ";
        for(let i=1;i<splitName.length-1;i++) {
            if(splitName[i].length>=3) {
                cardHolderName += splitName[i][0].toUpperCase() + " ";
            }
        }
        cardHolderName += splitName[splitName.length -1].toUpperCase();
        return cardHolderName;
    }

    

    const newCard = {
        employeeId: employeeId,
        number: faker.finance.creditCardNumber(),
        cardholderName: generateCardHolderName(employeeData),
        securityCode: encryptedCVV,
        expirationDate: dayjs().add(5, 'years').format('MM/YY'),
        isVirtual: false,
        isBlocked: false,
        type: cardType
    }

    try{
        await cardRepository.insert(newCard);
        return "Cartão criado com sucesso!";
    }
    catch(error){
        throw {type: "error_database", message: error};
    }
}