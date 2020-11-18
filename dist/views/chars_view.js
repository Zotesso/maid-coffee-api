"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(char) {
        return {
            id: char.id,
            name: char.name,
            level: char.level,
            energy: char.energy,
            popularity: char.popularity,
            knowledge: char.knowledge
        };
    }
};
