import { Injectable } from '@nestjs/common';
import { IBook } from './interfaces/book';
import { CreateBookDto } from './interfaces/dto/create';
import { UpdateBookDto } from './interfaces/dto/update';
import { Book, BookDocument } from './schemas/book';

import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  create(data: CreateBookDto): Promise<BookDocument> {
    const newBook = new this.BookModel(data);
    return newBook.save();
  }

  delete(id: IBook['id']): Promise<BookDocument> {
    return this.BookModel.findByIdAndDelete(id);
  }

  update(id: IBook['id'], data: UpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findByIdAndUpdate(id, data);
  }
}
