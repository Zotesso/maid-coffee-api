import User from "../models/User";
import chars_view from "./chars_view";

export default {
    render(user: User){
        return{
            id: user.id,
            username: user.username,
            email: user.email,
            char: chars_view.render(user.char)
        };
    },

    renderMany(users: User[]){
        return users.map(user => this.render(user));
    }
}
