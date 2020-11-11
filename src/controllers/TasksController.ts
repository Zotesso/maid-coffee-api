import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import Task from '../models/Task';

import tasksView from '../views/tasks_view';

export default {
    async show(request: Request, response: Response){
        const { type } = request.params;

        const tasksRepository = getRepository(Task);

        const tasks = await tasksRepository.find({
            where: [
              { type: type },
            ]
          });

        return response.json(tasksView.renderMany(tasks));
    },

    async create(request: Request, response: Response){
        const {
            title,
            description,
            type,
            energy,
            knowledge,
            popularity
        } = request.body;

        try{
        const data = {
            title,
            description,
            type,
            energy,
            knowledge,
            popularity
        }

        const tasksRepository = getRepository(Task);

        const task = tasksRepository.create(data);

        await tasksRepository.save(task);

        return response.status(201).json("Inserido com sucesso!");

        }catch(error){
            console.log(error);
        }
    }
};
