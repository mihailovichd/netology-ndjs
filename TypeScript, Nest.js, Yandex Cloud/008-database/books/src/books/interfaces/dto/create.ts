import { IBook } from "../book";

export class CreateBookDto {
    title: IBook['title'];
    description: IBook['description'];
}