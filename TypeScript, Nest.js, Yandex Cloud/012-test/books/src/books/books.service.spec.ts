import { BooksService } from './books.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';

const mockBookData = {
  title: '2@gmail.com',
  description: '3',
  _id: '663f834e6f8b5faad67074f9',
  __v: 0,
};

class mockBookModel {
  constructor(private data: any) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue([mockBookData]);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(mockBookData);
  static findByIdAndDelete = jest.fn().mockResolvedValue(true);
}

describe('Books Service (Unit)', () => {
  let booksService: BooksService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
        BooksService,
      ],
    }).compile();

    booksService = await app.resolve(BooksService);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('create', () => {
    it('should return object', async () => {
      expect(await booksService.create(mockBookData)).toEqual(mockBookData);
    });
  });

  describe('delete', () => {
    it('should return true', async () => {
      expect(await booksService.delete(mockBookData._id)).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should return updated object', async () => {
      expect(await booksService.update(mockBookData._id, {})).toEqual(
        mockBookData,
      );
    });
  });
});
