import { Module } from '@nestjs/common';
import { BookCommentsGatewayService } from './book.comments.gateway.service';
import { BookCommentsModule } from '../book.comments.module';

@Module({
  imports: [BookCommentsModule],
  providers: [BookCommentsGatewayService],
})
export class BookCommentsGatewayModule {}
