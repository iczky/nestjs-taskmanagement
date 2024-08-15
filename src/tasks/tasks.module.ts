import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksServiceImpl } from './tasks.service.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]),
    UsersModule,
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [{
    provide: 'TaskService',
    useClass: TasksServiceImpl,
  }]
})
export class TasksModule {}
