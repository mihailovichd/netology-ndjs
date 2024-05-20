import { BookComment } from '../../schemas/book.comment';

export interface UpdateBookCommentDto {
  title?: BookComment['comment'];
}
