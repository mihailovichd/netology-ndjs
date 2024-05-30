import { Injectable } from '@nestjs/common';
import {
  IHotelRoomService,
  SearchRoomsParams,
} from '../../interfaces/hotel.room.interface';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomDocument } from '../../schemas/hotel.room.schema';
import { Model } from 'mongoose';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly HotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  create(data: Partial<HotelRoom>): Promise<HotelRoom> {
    const newRoom = new this.HotelRoomModel(data);
    return newRoom.save();
  }

  findById(id: string): Promise<HotelRoom> {
    return this.HotelRoomModel.findById(id);
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    return this.HotelRoomModel.find(params);
  }

  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.HotelRoomModel.findByIdAndUpdate(id, data);
  }
}
