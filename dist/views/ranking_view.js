"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(char) {
        return {
            name: char.name,
            level: char.level
        };
    },
    renderMany(chars) {
        return chars.map(char => this.render(char));
    }
};
