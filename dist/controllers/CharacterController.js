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
const Char_1 = __importDefault(require("../models/Char"));
const chars_view_1 = __importDefault(require("../views/chars_view"));
const ranking_view_1 = __importDefault(require("../views/ranking_view"));
const Task_1 = __importDefault(require("../models/Task"));
const checkForLevelUp_1 = __importDefault(require("../utils/checkForLevelUp"));
const authenticateToken_1 = __importDefault(require("../utils/authenticateToken"));
exports.default = {
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { charName } = request.params;
            const charRepository = typeorm_1.getRepository(Char_1.default);
            if (authenticateToken_1.default(request.headers['authorization'])) {
                const char = yield charRepository.findOne({
                    where: [
                        { name: charName },
                    ]
                });
                if (char) {
                    return response.json(chars_view_1.default.render(char));
                }
                else {
                    return response.status(404).json("Personagem Não encontrado");
                }
            }
            else {
                return response.status(401).send();
            }
        });
    },
    doTask(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { charName, taskId } = request.params;
            if (authenticateToken_1.default(request.headers['authorization'])) {
                const taskRepository = typeorm_1.getRepository(Task_1.default);
                const charRepository = typeorm_1.getRepository(Char_1.default);
                const task = yield taskRepository.findOne({
                    where: [
                        { id: taskId },
                    ]
                });
                if (task) {
                    try {
                        const char = yield charRepository.findOne({
                            where: [
                                { name: charName },
                            ]
                        });
                        if (char) {
                            if (char.energy - task.energy >= 0) {
                                const addLevel = checkForLevelUp_1.default(char === null || char === void 0 ? void 0 : char.knowledge, char === null || char === void 0 ? void 0 : char.popularity, char === null || char === void 0 ? void 0 : char.level);
                                yield charRepository
                                    .createQueryBuilder()
                                    .update(Char_1.default)
                                    .set({
                                    energy: () => `energy - ${task.energy}`,
                                    knowledge: () => `knowledge + ${task.knowledge}`,
                                    popularity: () => `popularity + ${task.popularity}`,
                                    level: () => `level + ${addLevel}`
                                })
                                    .where("name = :name", { name: charName })
                                    .execute();
                                return response.status(201).json("Task completa com sucesso");
                            }
                            else {
                                return response.json("Energia não suficiente");
                            }
                        }
                    }
                    catch (error) {
                        return response.status(404).json("Algo deu errado");
                    }
                }
                else {
                    return response.status(404).json("Task Inexistente");
                }
            }
            else {
                return response.status(401).send();
            }
        });
    },
    ranking(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const charRepository = typeorm_1.getRepository(Char_1.default);
            const charsInRanking = yield charRepository
                .createQueryBuilder("char")
                .addOrderBy("level", "DESC")
                .limit(10)
                .getMany();
            return response.json(ranking_view_1.default.renderMany(charsInRanking));
        });
    }
};
