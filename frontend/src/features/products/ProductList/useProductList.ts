import { useCallback, useEffect, useState } from "react";

import { getProducts } from "../../../services/api";

import { getApiErrorMessage } from "../../auth/auth.utils";
import { PRODUCT_LIST_STATUS, type ProductListState } from "../product.types";

const INITIAL_PRODUCT_LIST_STATE: ProductListState = {
  error: null,
  products: [],
  status: PRODUCT_LIST_STATUS.LOADING,
};

interface UseProductListResult extends ProductListState {
  readonly removeProduct: (productId: string) => void;
}

export const useProductList = (): UseProductListResult => {
  const [state, setState] = useState<ProductListState>(
    INITIAL_PRODUCT_LIST_STATE,
  );

  useEffect(() => {
    let isActive = true;

    const loadProducts = async (): Promise<void> => {
      try {
        const response = await getProducts();

        if (!response._success || response._data === undefined) {
          throw new Error(response._message);
        }

        if (isActive) {
          setState({
            error: null,
            products: response._data,
            status: PRODUCT_LIST_STATUS.SUCCESS,
          });
        }
      } catch (error: unknown) {
        if (isActive) {
          setState({
            error: getApiErrorMessage(error),
            products: [],
            status: PRODUCT_LIST_STATUS.ERROR,
          });
        }
      }
    };

    void loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  const removeProduct = useCallback((productId: string): void => {
    setState((current) => ({
      ...current,
      products: current.products.filter((product) => product._id !== productId),
    }));
  }, []);

  return { ...state, removeProduct };
};
