import {Book} from "./books.interfaces";

export class CreateBookDto {
    title: Book['title'];
    description: Book['description'];
}

export class UpdateBookDto {
    title?: Book['title'];
    description?: Book['description'];
    authors?: Book['authors'];
    favorite?: Book['favorite'];
    fileCover?: Book['favorite'];
    fileName?: Book['fileName']
}