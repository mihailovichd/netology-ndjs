import {Body, Controller, Delete, Param, Post, Put} from "@nestjs/common";
import {BooksService} from "./books.service";
import { Book } from "./books.interfaces";
import { CreateBookDto, UpdateBookDto } from "./books.dto";

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post()
    create (@Body() createBookDto: CreateBookDto) {
        this.booksService.create(createBookDto)
    }

    @Delete(':id')
    delete (@Param('id') id: Book['id']) {
        this.booksService.delete(id)
    }

    @Put(':id')
    update (@Param('id') id: Book['id'], @Body() updateBookDto: UpdateBookDto) {
        this.booksService.update(id, updateBookDto)
    }
}