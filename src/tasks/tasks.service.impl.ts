import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './interface/task-service.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entity/user.entity';
import { GetUserDto } from '../users/dto/get-user.dto';
import { GetUser } from '../auth/get-user.decorator';

@Injectable()
export class TasksServiceImpl implements TaskService{
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<CreateTaskDto> {
    const user = await this.userRepository.findOne({where:{id: userId}})
    if (!user){
      throw new NotFoundException(`User with ID ${userId} not found`)
    }
    const task = this.tasksRepository.create({...createTaskDto, user});
    await this.tasksRepository.save(task);
    return createTaskDto;
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: {
        user: {id:userId}
      }
    })

  }

  async findById(id: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {id},
      relations: ['user'],
    });
    if (!task){
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    if (task.user.id !== userId){
      console.log("task userid", task.user.id);
      console.log("task id", id);
      console.log("userId", userId);
      throw new ForbiddenException(`User with ID ${userId} not found`)
    }

    const userDto = GetUserDto.fromEntity(task.user)

    return {
      ...task,
      user: userDto,
    } as Task
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findById(id, userId)
    await this.tasksRepository.delete(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.findById(id, userId);

    await this.tasksRepository.update(id, updateTaskDto);
    return task
  }

  async findByUserId(userId: number): Promise<Task[] | Task> {
    const tasks = await this.tasksRepository.find({where: {user: {id: userId}}})
    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(`No tasks found for User with ID ${userId}`);
    }
    return tasks
  }

}
