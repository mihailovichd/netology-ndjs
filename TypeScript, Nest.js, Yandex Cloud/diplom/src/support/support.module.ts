import { Module } from '@nestjs/common';
import { SupportService } from './support.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestSchema,
} from '../schemas/support.request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [SupportService],
})
export class SupportModule {}
