import { Test, TestingModule } from '@nestjs/testing';
import { ApiReservationManagerController } from './api.reservation.manager.controller';

describe('ApiReservationManagerController', () => {
  let controller: ApiReservationManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiReservationManagerController],
    }).compile();

    controller = module.get<ApiReservationManagerController>(
      ApiReservationManagerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
