import { IsNotEmpty, IsString } from 'class-validator';
import { IParamId } from '../param-id';
import { BookComment } from '../../schemas/book.comment';

export class CreateBookCommentDto {
  @IsNotEmpty()
  @IsString()
  id: IParamId['id'];

  @IsNotEmpty()
  @IsString()
  bookId: IParamId['id'];

  @IsNotEmpty()
  @IsString()
  comment: BookComment['comment'];
}
