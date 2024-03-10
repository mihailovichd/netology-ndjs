import booksModel from './models/books';
import { Book } from './interfaces';
import 'reflect-metadata';
import { injectable } from 'inversify';

interface CreateBookDto {
    title: Book['title'],
    description: Book['description'],
}

interface UpdateBookDto {
    title?: Book['title'],
    description?: Book['description'],
    authors?: Book['authors'],
    favorite?: Book['favorite'],
    fileCover?: Book['favorite'],
    fileName?: Book['fileName']
}

@injectable()
export default class BooksRepository {
    createBook(book: CreateBookDto): Promise<any> {
        return booksModel.create(book);
    };

    getBook(id: string): Promise<Book> {
        return booksModel.findById(id).select('-__v');
    };

    getBooks(): Promise<Book[]> {
        return booksModel.find().select('-__v');
    };

    updateBook(id: string, toUpdate: UpdateBookDto): Promise<any> {
        return booksModel.findByIdAndUpdate(id, toUpdate);
    };

    deleteBook(id: string): Promise<any> {
         return booksModel.findByIdAndDelete(id);
    };
}