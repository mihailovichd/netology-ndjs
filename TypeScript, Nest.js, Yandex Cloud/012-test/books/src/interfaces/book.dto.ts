import { IParamId } from './param-id';
import { Book } from '../schemas/book.schema';

export interface IBook {
  id: IParamId['id'];
  title: Book['title'];
  description: Book['description'];
  authors?: Book['authors'];
  favorite?: Book['favorite'];
  fileCover?: Book['fileCover'];
  fileName?: Book['fileName'];
}
