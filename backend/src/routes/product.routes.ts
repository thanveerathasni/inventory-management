import { Router } from 'express';

import { ProductController } from '../controllers/ProductController';
import { protect } from '../middleware/auth.middleware';
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductService } from '../services/ProductService';
import { validate } from '../middleware/validate.middleware';
import {
  createProductSchema,
  updateProductSchema,
} from '../validations/product.validation';

const router = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.use(protect);

router.post(
  '/',
  validate(createProductSchema),
  productController.createProduct
);

router.get(
  '/',
  productController.getAllProducts
);

router.put(
  '/:id',
  validate(updateProductSchema),
  productController.updateProduct
);

router.delete(
  '/:id',
  productController.deleteProduct
);

export default router;