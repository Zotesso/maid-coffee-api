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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTasksTable1605101647246 = void 0;
const typeorm_1 = require("typeorm");
class createTasksTable1605101647246 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "type",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "text"
                    },
                    {
                        name: "energy",
                        type: "integer"
                    },
                    {
                        name: "knowledge",
                        type: "integer"
                    },
                    {
                        name: "popularity",
                        type: "integer"
                    },
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('tasks');
        });
    }
}
exports.createTasksTable1605101647246 = createTasksTable1605101647246;
