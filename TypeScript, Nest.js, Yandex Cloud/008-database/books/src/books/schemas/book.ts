import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBook } from '../interfaces/book'

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({ required: true })
    public title: IBook['title'];

    @Prop({ required: true })
    public description: IBook['description'];

    @Prop()
    public authors: IBook['authors'];

    @Prop()
    public favorite: IBook['favorite'];

    @Prop()
    public fileCover: IBook['fileCover'];

    @Prop()
    public fileName: IBook['fileName'];
}

export const BookSchema = SchemaFactory.createForClass(Book);