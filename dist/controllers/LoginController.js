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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
require('dotenv').config();
exports.default = {
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = request.body;
                const userRepository = typeorm_1.getRepository(User_1.default);
                const user = yield userRepository.findOne({
                    where: [
                        { username: userData.username }
                    ],
                    relations: [
                        'char'
                    ]
                });
                if (user) {
                    const result = yield bcrypt_1.default.compare(userData.hashedPassword, user.hashedPassword);
                    if (result) {
                        const username = { name: userData.username };
                        const accessToken = jsonwebtoken_1.default.sign(username, process.env.ACCESS_TOKEN_SECRET);
                        response.json({
                            name: user.char.name,
                            accessToken: accessToken
                        });
                    }
                    else {
                        return response.json({ success: false, message: 'passwords do not match' });
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
