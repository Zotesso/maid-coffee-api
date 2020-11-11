import Task from '../models/Task';

export default {
    render(task: Task){
        return{
            id: task.id,
            title: task.title,
            description: task.description,
            type: task.type,
            energy: task.energy,
            popularity: task.popularity,
            knowledge: task.knowledge
        };
    },

    renderMany(tasks: Task[]){
        return tasks.map(task => this.render(task));
    }
}
