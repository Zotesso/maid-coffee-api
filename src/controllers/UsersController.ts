import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import User from '../models/User';

import encryptPassword from '../utils/encryptPassword';
import generateNewChar from '../utils/generateNewChar';

import UserView from '../views/users_view';

export default {
    async index(request: Request, response: Response){
        const userRepository = getRepository(User);

        const users = await userRepository.find({
            relations: ['char']
        });

        return response.json(UserView.renderMany(users));
    },

    async create(request: Request, response: Response){
        const {
            username,
            password,
            email,
            charName,
        } = request.body;

        const userRepository = getRepository(User);

        try{
            const hashedPassword: string = await encryptPassword(password, 8);
            const newChar = generateNewChar(charName);

            const data = {
                username,
                hashedPassword,
                email,
                "char": newChar
            }

            const user = userRepository.create(data);
            await userRepository.save(user);

            return response.status(201).json("Cadastrado com sucesso");
        }catch(error){
            console.log(error);
        }

    }
};
