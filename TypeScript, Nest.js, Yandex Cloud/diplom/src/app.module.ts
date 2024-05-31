import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportModule } from './support/support.module';
import { RouterModule } from '@nestjs/core';
import { ApiHotelModule } from './api/hotel/api.hotel.module';

// TODO: Interceptors, Pipes, Guards, Exceptions
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      tls: true,
      tlsCAFile: process.env.PATH_CA,
      authSource: process.env.MONGODB_NAME,
    }),
    UserModule,
    HotelModule,
    ReservationModule,
    SupportModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiHotelModule,
      },
    ]),
    ApiHotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
