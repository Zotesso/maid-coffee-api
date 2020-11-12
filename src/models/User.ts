import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Char from './Char';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    username: string;
    @Column()
    hashedPassword: string;
    @Column()
    email: string;

    @OneToOne(() => Char, char => char.user, {
        cascade: ['insert', 'update']
    })
    char: Char;
}
