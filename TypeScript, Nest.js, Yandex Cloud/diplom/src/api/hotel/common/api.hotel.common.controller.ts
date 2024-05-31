import { Controller, Get, Param } from '@nestjs/common';
import { HotelRoom } from '../../../schemas/hotel.room.schema';
import { HotelRoomService } from '../../../hotel/room/hotel.room.service';
import { SearchRoomsParams } from '../../../interfaces/hotel.room.interface';

@Controller('common')
export class ApiHotelCommonController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Get('hotel-rooms')
  getRooms(@Param() params: SearchRoomsParams): Promise<HotelRoom[]> {
    params.isEnabled = true;
    return this.hotelRoomService.search(params);
  }

  @Get('hotel-rooms/:id')
  getRoom(@Param('id') id: string): Promise<HotelRoom> {
    return this.hotelRoomService.findById(id);
  }
}
