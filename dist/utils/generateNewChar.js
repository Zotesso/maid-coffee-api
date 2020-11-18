"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateNewChar = (charName) => {
    return {
        "name": charName,
        "energy": 100,
        "knowledge": 100,
        "popularity": 100,
        "level": 1
    };
};
exports.default = generateNewChar;
