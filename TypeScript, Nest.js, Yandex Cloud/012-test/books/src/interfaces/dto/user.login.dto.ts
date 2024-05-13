import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from "../../schemas/user.schema";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: User['email'];

  @IsString()
  @IsNotEmpty()
  public password: User['password'];
}
