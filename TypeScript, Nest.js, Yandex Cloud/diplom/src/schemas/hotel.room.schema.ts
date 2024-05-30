import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
  @Prop({ required: true })
  hotel: Types.ObjectId;

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

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
