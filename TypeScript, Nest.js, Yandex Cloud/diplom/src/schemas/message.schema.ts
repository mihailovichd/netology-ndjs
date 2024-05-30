import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop()
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
