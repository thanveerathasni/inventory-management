import { AppError } from '../common/AppError';
import { PRODUCT_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { ProductRepository } from '../repositories/ProductRepository';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../validations/product.validation';

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async createProduct(productData: CreateProductDto) {
    return this.productRepository.create(productData);
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async updateProduct(
    id: string,
    productData: UpdateProductDto
  ) {
    const product = await this.productRepository.updateById(
      id,
      productData
    );

    if (!product) {
      throw new AppError(
        PRODUCT_MESSAGES.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.deleteById(id);

    if (!product) {
      throw new AppError(
        PRODUCT_MESSAGES.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return product;
  }
}