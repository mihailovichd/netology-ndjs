import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookComment, BookCommentDocument } from '../../schemas/book.comment';
import { CreateBookCommentDto } from '../../interfaces/dto/book.comment.create';
import { UpdateBookCommentDto } from '../../interfaces/dto/book.comment.update';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name)
    private readonly BookCommentModel: Model<BookCommentDocument>,
  ) {}

  create(data: CreateBookCommentDto): Promise<BookCommentDocument> {
    const newComment = new this.BookCommentModel(data);
    return newComment.save();
  }

  delete(id: BookComment['id']): Promise<BookCommentDocument> {
    return this.BookCommentModel.findByIdAndDelete(id);
  }

  update(
    id: BookComment['id'],
    data: UpdateBookCommentDto,
  ): Promise<BookCommentDocument> {
    return this.BookCommentModel.findByIdAndUpdate(id, data);
  }

  findAllBookComment(
    bookId: BookComment['bookId'],
  ): Promise<BookCommentDocument[]> {
    return this.BookCommentModel.find({ bookId: bookId });
  }
}
