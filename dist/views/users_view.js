"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chars_view_1 = __importDefault(require("./chars_view"));
exports.default = {
    render(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            char: chars_view_1.default.render(user.char)
        };
    },
    renderMany(users) {
        return users.map(user => this.render(user));
    }
};
