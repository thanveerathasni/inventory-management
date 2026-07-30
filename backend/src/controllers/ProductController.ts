import { Request, Response } from 'express';

import { ApiResponse } from '../common/ApiResponse';
import { asyncHandler } from '../common/asyncHandler';
import { PRODUCT_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { ProductService } from '../services/ProductService';

export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

  createProduct = asyncHandler(
    async (req: Request, res: Response) => {
      const product = await this.productService.createProduct(req.body);

      return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
          true,
          HTTP_STATUS.CREATED,
          PRODUCT_MESSAGES.CREATED,
          product
        )
      );
    }
  );

  getAllProducts = asyncHandler(
    async (_req: Request, res: Response) => {
      const products = await this.productService.getAllProducts();

      return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
          true,
          HTTP_STATUS.OK,
          PRODUCT_MESSAGES.FETCHED,
          products
        )
      );
    }
  );

  updateProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const id = String(req.params.id);
      const product = await this.productService.updateProduct(
        id,
        req.body
      );

      return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
          true,
          HTTP_STATUS.OK,
          PRODUCT_MESSAGES.UPDATED,
          product
        )
      );
    }
  );

  deleteProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const id = String(req.params.id);
      await this.productService.deleteProduct(id);

      return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
          true,
          HTTP_STATUS.OK,
          PRODUCT_MESSAGES.DELETED
        )
      );
    }
  );
}