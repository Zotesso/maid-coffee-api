import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import Char from '../models/Char';

import charsView from '../views/chars_view';
import Task from '../models/Task';

export default {
    async show(request: Request, response: Response) {
        const { charName } = request.params;

        const charRepository = getRepository(Char);

        const char = await charRepository.findOne({
            where: [
                { name: charName },
            ]
        });

        if (char) {
            return response.json(charsView.render(char));
        } else {
            return response.status(404).json("Personagem Não encontrado");
        }
    },

    async doTask(request: Request, response: Response) {
        const { charName, taskId } = request.params;

        const taskRepository = getRepository(Task);
        const charRepository = getRepository(Char);

        const task = await taskRepository.findOne({
            where: [
                { id: taskId },
            ]
        });

        if (task) {
            try {
                await charRepository
                    .createQueryBuilder()
                    .update(Char)
                    .set({
                        energy: () => `energy - ${task.energy}`,
                        knowledge: () => `knowledge + ${task.knowledge}`,
                        popularity: () => `popularity + ${task.popularity}`
                    })
                    .where("name = :name", { name: charName })
                    .execute();

                return response.status(201).send();
            } catch (error) {
                return response.status(404).json("Algo deu errado");
            }
        } else {
            return response.status(404).json("Task Inexistente");
        }
    }
};
