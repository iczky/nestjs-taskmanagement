import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtUtilService } from './jwt-util.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '1d'}
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtUtilService],
  exports: [JwtUtilService, JwtModule, PassportModule]
})
export class AuthModule {}
