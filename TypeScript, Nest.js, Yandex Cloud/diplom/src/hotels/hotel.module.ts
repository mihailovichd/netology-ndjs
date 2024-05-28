import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelRoomService } from './room/hotel.room.service';

@Module({
  providers: [HotelService, HotelRoomService],
})
export class HotelModule {}
