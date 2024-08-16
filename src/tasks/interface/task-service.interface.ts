import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entity/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface TaskService {
  create(createTaskDto: CreateTaskDto, userId: number): Promise<CreateTaskDto>;
  findAll(): Promise<Task[]>;
  findById(id: number, userId: number): Promise<Task>;
  findByUserId(userId: number): Promise<Task[] | Task>;
  update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task>;
  remove(id: number, userId: number): Promise<void>;
}