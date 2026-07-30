import { IProduct, Product } from '../models/Product.model';
import { BaseRepository } from './BaseRepository';

export class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(Product);
  }
}