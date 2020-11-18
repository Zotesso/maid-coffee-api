"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkForLevelUp = (knowledge, popularity, actualLevel) => {
    if (((popularity * 5 + knowledge * 2) / 2) >= actualLevel * 1000) {
        return 1;
    }
    return 0;
};
exports.default = checkForLevelUp;
