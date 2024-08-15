import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User} from "../users/entity/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.register(createUserDto)
        return {
            message: 'User registered'
        }
    }

    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string) {
        const token = await this.authService.login(username, password);
        if (!token){
            return{
                message: 'Invalid credentials',
            }
        }
        return {
            access_token: token.access_token,
        }
    }
}
