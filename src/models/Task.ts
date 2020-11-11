import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity('tasks')
export default class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    energy: number;

    @Column()
    knowledge: number;

    @Column()
    popularity: number;
}
