import { Injectable } from '@nestjs/common';
import {
  IHotelRoomService,
  SearchRoomsParams,
} from '../../interfaces/hotel.room.interface';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from '../../schemas/hotel.room.schema';
import { Model } from 'mongoose';
import { CreateRoomDto } from '../../interfaces/dto/hotel.room.dto';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly HotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  create(data: CreateRoomDto): Promise<HotelRoom> {
    const newRoom = new this.HotelRoomModel(data);
    return newRoom.save();
  }

  findById(id: string): Promise<HotelRoom> {
    return this.HotelRoomModel.findById(id);
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { offset, limit, hotel } = params;
    return this.HotelRoomModel.find({ hotel }).limit(limit).skip(offset);
  }

  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.HotelRoomModel.findByIdAndUpdate(id, data);
  }
}
