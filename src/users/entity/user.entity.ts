import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entity/task.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}