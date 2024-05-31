import { Test, TestingModule } from '@nestjs/testing';
import { ApiHotelAdminController } from './api.hotel.admin.controller';

describe('ApiController', () => {
  let controller: ApiHotelAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiHotelAdminController],
    }).compile();

    controller = module.get<ApiHotelAdminController>(ApiHotelAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
