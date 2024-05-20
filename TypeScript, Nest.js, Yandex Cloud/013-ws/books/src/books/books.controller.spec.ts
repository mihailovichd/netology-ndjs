import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

const mockBook = {
  title: '2@gmail.com',
  description: '3',
};

describe('BookController', () => {
  let app: INestApplication;
  const booksService = {
    create: (f: any) => f,
    update: jest.fn().mockResolvedValue(mockBook),
    delete: jest.fn().mockResolvedValue(true),
  };

  beforeAll(async () => {
    const mockJwtAuthGuard = { canActivate: jest.fn(() => true) };
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: booksService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST books', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send(mockBook)
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect(mockBook);
  });

  it('/DELETE books/:id', async () => {
    return request(app.getHttpServer())
      .delete('/books/' + '663f834e6f8b5faad67074f9')
      .expect(200);
  });

  it('/PUT books/:id', async () => {
    return request(app.getHttpServer())
      .put('/books/' + '663f834e6f8b5faad67074f9')
      .send(mockBook)
      .set('Content-Type', 'application/json')
      .expect(200);
  });
});
