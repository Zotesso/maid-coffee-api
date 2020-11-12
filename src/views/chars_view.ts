import Char from '../models/Char';

export default {
    render(char: Char){
        return{
            id: char.id,
            name: char.name,
            level: char.level,
            energy: char.energy,
            popularity: char.popularity,
            knowledge: char.knowledge
        };
    }
}
