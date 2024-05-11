import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ValidationPipe } from '../validation/validation.pipe';
import { JoiValidationPipe } from '../validation/joi.validation';
import { BookDocument } from '../schemas/book.schema';
import { IParamId } from '../interfaces/param-id';
import { CreateBookDto } from '../interfaces/dto/book.create.dto';
import { UpdateBookDto } from '../interfaces/dto/book.update.dto';
import { updateSchema } from '../validation/schemas/book.update.schema';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('books')
@UseGuards(JwtAuthGuard)
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
