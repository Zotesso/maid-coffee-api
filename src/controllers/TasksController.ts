import { Request, Response } from 'express';

export default {
    async show(request: Request, response: Response){
        console.log("herou");
        return response.json("hello");
    }
};
