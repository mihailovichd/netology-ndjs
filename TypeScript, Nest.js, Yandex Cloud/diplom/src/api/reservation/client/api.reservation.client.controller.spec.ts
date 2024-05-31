import { Test, TestingModule } from '@nestjs/testing';
import { ApiReservationClientController } from './api.reservation.client.controller';

describe('ApiReservationClientController', () => {
  let controller: ApiReservationClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiReservationClientController],
    }).compile();

    controller = module.get<ApiReservationClientController>(
      ApiReservationClientController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
