import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import User from './User';

@Entity('chars')
export default class Char {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    energy: number;

    @Column()
    knowledge: number;

    @Column()
    popularity: number;

    @Column()
    level: number;

    @OneToOne(() => User, user => user.char)
    @JoinColumn({name: 'user_id'})
    user: User;

}
