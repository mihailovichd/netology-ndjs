import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './interfaces/dto/create';
import { UpdateBookDto } from './interfaces/dto/update';
import { BookDocument } from './schemas/book';
import { IParamId } from './interfaces/param-id';
import { ValidationPipe } from '../validation/validation.pipe';
import { updateSchema } from '../validation/schemas/update';
import { JoiValidationPipe } from '../validation/joi.validation';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @Delete(':id')
  delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.booksService.delete(id);
  }

  @UsePipes(new JoiValidationPipe(updateSchema))
  @Put(':id')
  update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.update(id, body);
  }
}
