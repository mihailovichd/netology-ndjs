import { HotelRoom } from '../schemas/hotel.room.schema';
import { CreateRoomDto } from './dto/hotel.room.dto';

export interface IHotelRoomService {
  create(data: CreateRoomDto): Promise<HotelRoom>;
  findById(id: string): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: string;
  isEnabled?: boolean;
}
