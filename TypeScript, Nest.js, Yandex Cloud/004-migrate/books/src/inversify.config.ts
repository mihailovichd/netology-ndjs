import BooksRepository from './services';
import { Container } from 'inversify';

const container = new Container;
container.bind(BooksRepository).toSelf().inSingletonScope();

export { container };