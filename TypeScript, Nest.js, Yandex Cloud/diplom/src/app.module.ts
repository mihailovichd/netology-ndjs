import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './hotels/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      tls: true,
      tlsCAFile: process.env.PATH_CA,
      authSource: process.env.MONGODB_NAME,
    }),
    HotelModule,
    ReservationModule,
    SupportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
