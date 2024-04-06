import {Body, Controller, Delete, Param, Post, Put} from "@nestjs/common";
import {BooksService} from "./books.service";
import { CreateBookDto } from "./interfaces/dto/create";
import { UpdateBookDto } from "./interfaces/dto/update";
import {BookDocument} from "./schemas/book";
import {IParamId} from "./interfaces/param-id";

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post()
    create (@Body() body: CreateBookDto): Promise<BookDocument> {
        return this.booksService.create(body)
    }

    @Delete(':id')
    delete (@Param() { id }: IParamId): Promise<BookDocument> {
        return this.booksService.delete(id)
    }

    @Put(':id')
    update(@Param() { id }: IParamId, @Body() body: UpdateBookDto): Promise<BookDocument> {
        return this.booksService.update(id, body)
    }
}