import { API_ENDPOINTS } from "../../constants/api";

import { apiClient } from "./axios";
import type { ApiResponse } from "./api.types";

export interface Product {
  readonly _id: string;
  readonly category?: string;
  readonly createdAt: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly updatedAt: string;
}

export interface CreateProductRequest {
  readonly category?: string;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
}

export const getProducts = async (): Promise<
  ApiResponse<readonly Product[]>
> => {
  const response = await apiClient.get<ApiResponse<readonly Product[]>>(
    API_ENDPOINTS.PRODUCTS.BASE,
  );

  return response.data;
};

export const createProduct = async (
  payload: CreateProductRequest,
): Promise<ApiResponse<Product>> => {
  const response = await apiClient.post<ApiResponse<Product>>(
    API_ENDPOINTS.PRODUCTS.BASE,
    payload,
  );

  return response.data;
};
