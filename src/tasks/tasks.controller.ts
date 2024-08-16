import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './interface/task-service.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './entity/task.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUtilService } from '../auth/jwt-util.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entity/user.entity';

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
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<CreateTaskDto> {
    return this.taskService.create(createTaskDto, user.id);
  }

  @Get()
  findAll(){
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @GetUser() user: User) {
    console.log(user);
    return this.taskService.findById(id, user.id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User) {
    return this.taskService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @GetUser() user: User) {
    return this.taskService.remove(id, user.id);
  }

  @Get('user/:id')
  getTaskByUserId(@Param('id') id: number) {
    return this.taskService.findByUserId(id);
  }


}
