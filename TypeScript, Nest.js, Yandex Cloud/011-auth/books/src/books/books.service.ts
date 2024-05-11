import { Injectable } from '@nestjs/common';
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CreateBookDto } from '../interfaces/dto/book.create.dto';
import { Book, BookDocument } from '../schemas/book.schema';
import { UpdateBookDto } from '../interfaces/dto/book.update.dto';
import { IBook } from '../interfaces/book.dto';

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
