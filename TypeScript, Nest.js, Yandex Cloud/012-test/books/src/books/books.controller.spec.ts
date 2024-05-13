import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

describe('BookController', () => {
  let app: INestApplication;
  const booksService = {
    create: (f) => f,
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: booksService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/POST books', () => {
    const data = {
      title: '2@gmail.com',
      description: '3',
    };

    return request(app.getHttpServer())
      .post('/books')
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(201)
      .expect({ data: 'hui' });
  });
});
