import Char from '../models/Char';

export default {
    render(char: Char){
        return{
            name: char.name,
            level: char.level
        };
    },

    renderMany(chars: Char[]){
        return chars.map(char => this.render(char));
    }
}
