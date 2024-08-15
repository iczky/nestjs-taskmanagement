import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Task{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default: 'pending'})
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}