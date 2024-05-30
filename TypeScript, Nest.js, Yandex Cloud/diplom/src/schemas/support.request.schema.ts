import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Message } from './message.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop({ required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  messages: Message[];

  @Prop()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
