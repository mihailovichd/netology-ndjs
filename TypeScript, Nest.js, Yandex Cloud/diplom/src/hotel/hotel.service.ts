import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from '../schemas/hotel.schema';
import {
  IHotelService,
  SearchHotelParams,
  UpdateHotelParams,
} from '../interfaces/hotel.interface';
import { CreateHotelDto } from '../interfaces/dto/hotel.dto';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly HotelModel: Model<HotelDocument>,
  ) {}

  create(data: CreateHotelDto): Promise<Hotel> {
    const newHotel = new this.HotelModel(data);
    return newHotel.save();
  }

  findById(id: string): Promise<Hotel> {
    return this.HotelModel.findById(id);
  }

  search(params: SearchHotelParams): Promise<Hotel[]> {
    const { limit, offset, title } = params;
    return this.HotelModel.find({ title }).skip(offset).limit(limit);
  }

  update(id: string, data: UpdateHotelParams): Promise<Hotel> {
    return this.HotelModel.findByIdAndUpdate(id, data);
  }
}
