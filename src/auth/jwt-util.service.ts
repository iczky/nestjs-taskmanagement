import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  extractIdFromToken(token: string) {
    const decoded = this.jwtService.decode(token);
    console.log(decoded);
    if (typeof decoded === 'object' && decoded['userId']){
      return decoded['userId']
    }
    throw new UnauthorizedException('Unauthorized');
  }
}