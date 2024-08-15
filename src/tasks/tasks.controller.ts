import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './interface/task-service.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './entity/task.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUtilService } from '../auth/jwt-util.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    @Inject('TaskService')
    private readonly taskService: TaskService,
    private readonly jwtUtilService: JwtUtilService,
  ) {
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any): Promise<Task> {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const userId: number = this.jwtUtilService.extractIdFromToken(token)
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  findAll(){
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.taskService.remove(id);
  }

  @Get('user/:id')
  getTaskByUserId(@Param('id') id: number) {
    return this.taskService.findByUserId(id);
  }


}
