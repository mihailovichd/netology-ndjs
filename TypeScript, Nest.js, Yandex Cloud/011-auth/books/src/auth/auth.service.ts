import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password == pass) {
      const { _id, firstName, email } = user;
      return {
        access_token: this.jwtService.sign({ id: _id, firstName, email }),
      };
    }
    return null;
  }

  async validateUserJwt(token: string): Promise<any> {
    const user = await this.usersService.findById(token);
    if (user) {
      return user;
    }
    return null;
  }
}
