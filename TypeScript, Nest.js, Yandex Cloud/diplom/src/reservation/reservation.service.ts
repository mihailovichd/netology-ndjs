import { Injectable } from '@nestjs/common';
import {
  IReservationService,
  ReservationSearchOptions,
} from '../interfaces/reservation.interface';
import { InjectModel } from '@nestjs/mongoose';
import {
  Reservation,
  ReservationDocument,
} from '../schemas/reservation.schema';
import { Model } from 'mongoose';
import { ReservationDto } from '../interfaces/dto/reservation.dto';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly ReservationModel: Model<ReservationDocument>,
  ) {}

  async addReservation(data: ReservationDto): Promise<Reservation> {
    const roomsInTime = await this.ReservationModel.find({
      roomId: data.roomId,
      $or: [
        { dateStart: { $gte: data.dateStart } },
        { dateEnd: { $lte: data.dateEnd } },
      ],
    });

    if (roomsInTime.length > 0) {
      throw new Error('room in this time is busy');
    }

    const newReservation = new this.ReservationModel(data);
    return newReservation.save();
  }

  removeReservation(id: string): Promise<void> {
    return this.ReservationModel.findByIdAndDelete(id);
  }

  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>> {
    return this.ReservationModel.find(filter);
  }
}
