import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHotelDto } from '../../../interfaces/dto/hotel.dto';
import { HotelService } from '../../../hotel/hotel.service';
import { SearchHotelParams } from '../../../interfaces/hotel.interface';
import { CreateRoomDto } from '../../../interfaces/dto/hotel.room.dto';
import { HotelRoomService } from '../../../hotel/room/hotel.room.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('admin')
export class ApiHotelAdminController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Post('hotels')
  addHotel(@Body() body: CreateHotelDto) {
    return this.hotelService.create(body);
  }

  @Get('hotels')
  getHotels(@Param() params: SearchHotelParams) {
    return this.hotelService.search(params);
  }

  @Get('hotels/:id')
  getHotel(@Param('id') id: string) {
    return this.hotelService.findById(id);
  }

  @Post('hotel-rooms')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }]))
  addRoom(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateRoomDto,
  ) {
    body.images = files;
    return this.hotelRoomService.create(body);
  }
}
