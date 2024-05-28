import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class HotelRoom {
  @Prop({ required: true })
  hotel: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true, default: true })
  isEnabled: boolean;
}
