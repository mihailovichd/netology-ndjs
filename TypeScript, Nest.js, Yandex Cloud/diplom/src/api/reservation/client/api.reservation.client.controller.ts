import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ReservationService } from '../../../reservation/reservation.service';

// TODO: Auth & Guards
@Controller('client/reservations')
export class ApiReservationClientController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  addReservation(@Body() body: any) {
    return this.reservationService.addReservation(body);
  }

  // Auth & Guards
  // @Get()
  // getReservations() {
  //
  // }

  @Delete(':id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationService.removeReservation(id);
  }
}
