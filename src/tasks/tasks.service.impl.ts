import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './interface/task-service.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class TasksServiceImpl implements TaskService{
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const user = await this.userRepository.findOne({where:{id: userId}})
    const task = this.tasksRepository.create({...createTaskDto, user});
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findById(id: number): Promise<Task> {
    return this.tasksRepository.findOne({where: { id }});
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findById(id);
  }

  async findByUserId(userId: number): Promise<Task> {
    const user = await this.userRepository.findOne({where:{id: userId}})
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.tasksRepository.findOne({ where: { user } });
  }


}
