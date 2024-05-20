import { IBook } from '../book.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: IBook['title'];

  @IsNotEmpty()
  @IsString()
  description: IBook['description'];
}
