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
const User_1 = __importDefault(require("../models/User"));
const encryptPassword_1 = __importDefault(require("../utils/encryptPassword"));
const generateNewChar_1 = __importDefault(require("../utils/generateNewChar"));
const users_view_1 = __importDefault(require("../views/users_view"));
exports.default = {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(User_1.default);
            const users = yield userRepository.find({
                relations: ['char']
            });
            return response.json(users_view_1.default.renderMany(users));
        });
    },
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email, charName, } = request.body;
            const userRepository = typeorm_1.getRepository(User_1.default);
            try {
                const hashedPassword = yield encryptPassword_1.default(password, 8);
                const newChar = generateNewChar_1.default(charName);
                const data = {
                    username,
                    hashedPassword,
                    email,
                    "char": newChar
                };
                const user = userRepository.create(data);
                yield userRepository.save(user);
                return response.status(201).json("Cadastrado com sucesso");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
