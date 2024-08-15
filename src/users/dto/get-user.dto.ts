import { User } from '../entity/user.entity';

export class GetUserDto {
  id: number;
  username: string;
  role: string;

  static fromEntity(user: User): GetUserDto {
    const dto = new GetUserDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.role = user.role;
    return dto;
  }
}