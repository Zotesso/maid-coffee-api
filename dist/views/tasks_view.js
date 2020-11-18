"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(task) {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            type: task.type,
            energy: task.energy,
            popularity: task.popularity,
            knowledge: task.knowledge
        };
    },
    renderMany(tasks) {
        return tasks.map(task => this.render(task));
    }
};
