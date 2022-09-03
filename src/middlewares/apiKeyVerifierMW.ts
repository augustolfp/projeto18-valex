import { NextFunction, Request, Response } from "express";
import * as companyRepository from "../repositories/companyRepository";

export async function verifyCompanyApiKey(req: Request, res: Response, next: NextFunction) {
    const companyApiKey: string = req.header('x-api-key')!;

    try{
        const getCompanyData = await companyRepository.findByApiKey(companyApiKey);
        if(getCompanyData.name){
            console.log(`Company API key verified. Company name: ${getCompanyData.name}`);
            next();
        }
        else {
            return res.status(401).send("API key não cadastrada!");
        }
    }
    catch(error) {
        return res.status(401).send("API key não cadastrada!");
    }
}