import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './interfaces/dto/user.create.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(new ValidationPipe())
  @Post('signup')
  signup(@Body() body: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@Request() req): Promise<UserDocument> {
    return req.user;
  }
}
