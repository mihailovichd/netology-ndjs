import { Schema, model, Document } from 'mongoose';
import { Book } from '../interfaces';

const booksSchema = new Schema({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    authors: {
        type: String,
    },

    favorite: {
        type: String,
    },

    fileCover: {
        type: String,
    },

    fileName: {
        type: String,
    },
})

export default model<Book & Document>('books', booksSchema);