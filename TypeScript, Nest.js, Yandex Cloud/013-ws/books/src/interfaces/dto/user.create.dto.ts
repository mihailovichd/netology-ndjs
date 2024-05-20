import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../schemas/user.schema';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: User['email'];

  @IsNotEmpty()
  @IsString()
  public password: User['password'];

  @IsNotEmpty()
  @IsString()
  public firstName: User['firstName'];

  @IsNotEmpty()
  @IsString()
  public lastName: User['lastName'];
}
