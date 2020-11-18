"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const authenticateToken = (authHeader) => {
    try {
        const token = authHeader && authHeader.split(' ')[1];
        if (token === null)
            return false;
        if (token === undefined)
            return false;
        return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (error) {
        return false;
    }
};
exports.default = authenticateToken;
