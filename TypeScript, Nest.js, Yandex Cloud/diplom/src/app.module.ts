import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './hotels/hotel.module';
import { HotelServiceService } from './hotel.service/hotel.service.service';
import { HotelRoomService } from './hotels/room/hotel.room.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, HotelServiceService, HotelRoomService],
})
export class AppModule {}
