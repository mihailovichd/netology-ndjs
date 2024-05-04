import { IParamId } from './param-id';

export interface IBook {
  id: IParamId['id'];
  title: string;
  description: string;
  authors?: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
}
