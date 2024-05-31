import { Module } from '@nestjs/common';
import { ApiReservationClientController } from './client/api.reservation.client.controller';
import { ApiReservationManagerController } from './manager/api.reservation.manager.controller';

@Module({
  controllers: [
    ApiReservationClientController,
    ApiReservationManagerController,
  ],
})
export class ApiReservationModule {}
