"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Task_1 = __importDefault(require("../models/Task"));
const tasks_view_1 = __importDefault(require("../views/tasks_view"));
exports.default = {
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = request.params;
            const tasksRepository = typeorm_1.getRepository(Task_1.default);
            const tasks = yield tasksRepository.find({
                where: [
                    { type: type },
                ]
            });
            return response.json(tasks_view_1.default.renderMany(tasks));
        });
    },
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, type, energy, knowledge, popularity } = request.body;
            try {
                const data = {
                    title,
                    description,
                    type,
                    energy,
                    knowledge,
                    popularity
                };
                const tasksRepository = typeorm_1.getRepository(Task_1.default);
                const task = tasksRepository.create(data);
                yield tasksRepository.save(task);
                return response.status(201).json("Inserido com sucesso!");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
