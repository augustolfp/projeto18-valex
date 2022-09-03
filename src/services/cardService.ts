import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

export async function createCard(companyApiKey: string, employeeId: number, cardType: cardRepository.TransactionTypes ) {

    const cryptr = new Cryptr(process.env.CRYPTR_KEY!);
    const encryptedCVV: string = cryptr.encrypt(faker.finance.creditCardCVV());

    const employeeData = await employeeRepository.findById(employeeId);

    const newCard = {
        employeeId: employeeId,
        number: faker.finance.creditCardNumber(),
        cardholderName: employeeData.fullName,
        securityCode: encryptedCVV,
        expirationDate: "05/35",
        password: "ImplementLater",
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