import { IBook } from '../book';
import { IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: IBook['title'];
  @IsString()
  description: IBook['description'];
}
