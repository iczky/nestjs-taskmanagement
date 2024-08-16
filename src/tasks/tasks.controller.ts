import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './interface/task-service.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUtilService } from '../auth/jwt-util.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entity/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

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
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: any): Promise<CreateTaskDto> {
    return this.taskService.create(createTaskDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: any){
    return this.taskService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @GetUser() user: any) {
    console.log(user);
    return this.taskService.findById(id, user.userId);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: any) {
    return this.taskService.update(id, updateTaskDto, user.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @GetUser() user: any) {
    return this.taskService.remove(id, user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('user/:id')
  getTaskByUserId(@Param('id') id: number) {
    return this.taskService.findByUserId(id);
  }


}
