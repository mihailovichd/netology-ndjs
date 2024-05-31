import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ReservationService } from '../../../reservation/reservation.service';

@Controller('manager/reservations')
export class ApiReservationManagerController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':userId')
  getReservation(@Param('userId') userId: string) {
    return this.reservationService.getReservations({ userId });
  }

  @Delete(':id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationService.removeReservation(id);
  }
}
