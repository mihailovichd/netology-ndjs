import { Test, TestingModule } from '@nestjs/testing';
import { ApiHotelCommonController } from './api.hotel.common.controller';

describe('ApiController', () => {
  let controller: ApiHotelCommonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiHotelCommonController],
    }).compile();

    controller = module.get<ApiHotelCommonController>(ApiHotelCommonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
