import { Reservation } from '../schemas/reservation.schema';
import { ReservationDto } from './dto/reservation.dto';

export interface IReservationService {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions,
  ): Promise<Array<Reservation>>;
}

export interface ReservationSearchOptions {
  userId: string;
  dateStart?: Date;
  dateEnd?: Date;
}
