import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/entity/user.entity";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
                private readonly jwtService: JwtService) {
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const userData: CreateUserDto = {
            username: createUserDto.username,
            password: hashedPassword,
            role: createUserDto.role
        }
        return await this.userService.create(userData);
    }

    async login(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = {username: user.username, role: user.role}
            return {
                access_token: this.jwtService.sign(payload),
            }
        }
        return null;
    }
}
