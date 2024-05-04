import { IBook } from '../book';

export interface UpdateBookDto {
  title?: IBook['title'];
  description?: IBook['description'];
  authors?: IBook['authors'];
  favorite?: IBook['favorite'];
  fileCover?: IBook['favorite'];
  fileName?: IBook['fileName'];
}
