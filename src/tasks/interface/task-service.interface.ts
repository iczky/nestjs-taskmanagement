import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entity/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface TaskService {
  create(createTaskDto: CreateTaskDto, userId: number): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task>;
  findByUserId(userId: number): Promise<Task>;
  update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
  remove(id: number): Promise<void>;
}