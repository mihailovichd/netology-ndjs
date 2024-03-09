import booksModel from './models/books'
import { Book } from "./interfaces"
import "reflect-metadata";
import {injectable} from "inversify";

@injectable()
export class BooksRepository {
    createBook(book: Book): Promise<any> {
        return booksModel.create(book)
    }

    getBook(id: string): Promise<Book> {
        return booksModel.findById(id).select('-__v')
    }

    getBooks(): Promise<Book[]> {
        return booksModel.find().select('-__v')
    }

    updateBook(id: string, toUpdate: any[]): Promise<any> {
        return booksModel.findByIdAndUpdate(id, toUpdate)
    }

    deleteBook(id: string): Promise<any> {
         return booksModel.findByIdAndDelete(id)
    }
}