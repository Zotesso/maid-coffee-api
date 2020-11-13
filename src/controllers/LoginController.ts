import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import jwt, { Secret } from 'jsonwebtoken';

import { getRepository } from 'typeorm';
import User from '../models/User';

require('dotenv').config();

export default {
    async login(request: Request, response: Response){
        try{
            const userData = request.body;

            const userRepository = getRepository(User);

            const user = await userRepository.findOne({
                where: [
                    {username: userData.username}
                ],
                relations: [
                    'char'
                ]
            })

            if(user){
               const result = await bcrypt.compare(userData.hashedPassword, user.hashedPassword);

                  if(result){
                    const username = {name: userData.username}

                    const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET as Secret);

                    response.json({
                        name: user.char.name,
                        accessToken: accessToken
                    })
                  }else{
                        return response.json({success: false, message: 'passwords do not match'});
                  }
                }
        }catch(error){
            console.log(error);
        }
    }
};
