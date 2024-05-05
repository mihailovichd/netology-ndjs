import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @prop({required: true})
}

export const BookSchema = SchemaFactory.createForClass(User);
