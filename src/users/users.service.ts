import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entity/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(userData: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({where: {username: username}});
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOne({where: {id}});
    }

}
