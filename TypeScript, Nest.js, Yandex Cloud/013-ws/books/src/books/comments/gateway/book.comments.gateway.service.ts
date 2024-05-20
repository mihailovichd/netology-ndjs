import { Injectable, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { BookCommentsService } from '../book.comments.service';
import {
  BookComment,
  BookCommentDocument,
} from '../../../schemas/book.comment';
import { CreateBookCommentDto } from '../../../interfaces/dto/book.comment.create';

@WebSocketGateway({ cors: true })
@Injectable()
export class BookCommentsGatewayService {
  constructor(private readonly booksCommentsService: BookCommentsService) {}

  @SubscribeMessage('getAllComments')
  handleGetAllComments(
    @MessageBody('bookId', new ValidationPipe()) bookId: BookComment['bookId'],
  ): Promise<BookCommentDocument[]> {
    return this.booksCommentsService.findAllBookComment(bookId);
  }

  @SubscribeMessage('addComment')
  handleAddComment(
    @MessageBody(new ValidationPipe()) data: CreateBookCommentDto,
  ): Promise<BookCommentDocument> {
    return this.booksCommentsService.create(data);
  }
}
