import { Injectable } from "@nestjs/common";
import { Book } from "./books.interfaces";
import {CreateBookDto, UpdateBookDto} from "./books.dto";

@Injectable()
export class BooksService {
    private readonly storage = []

    create (book: CreateBookDto) {
        book['id'] = 'some generate'
        this.storage.push(book)
    }

    delete (id: Book['id']) {
        const idx: number = this.storage.findIndex(el => el.id === id)
        this.storage.slice(idx, 1)
    }

    update (id: Book['id'], book: UpdateBookDto) {
        const idx: number = this.storage.findIndex(el => el.id === id)
        this.storage[idx] = {
            ...this.storage[idx],
            book
        }
    }
}