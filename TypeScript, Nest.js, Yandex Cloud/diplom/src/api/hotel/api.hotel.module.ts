import { Module } from '@nestjs/common';
import { ApiHotelCommonController } from './common/api.hotel.common.controller';
import { HotelModule } from '../../hotel/hotel.module';
import { ApiHotelAdminController } from './admin/api.hotel.admin.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    HotelModule,
    MulterModule.register({
      dest: './img',
    }),
  ],
  controllers: [ApiHotelCommonController, ApiHotelAdminController],
})
export class ApiHotelModule {}
