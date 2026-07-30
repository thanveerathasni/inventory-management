import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PRODUCT_MESSAGES } from "../../../constants/messages";
import { PROTECTED_ROUTES } from "../../../constants/routes";
import {
  getProducts,
  type Product,
  updateProduct,
} from "../../../services/api";
import { getApiErrorMessage } from "../../auth/auth.utils";
import type { ProductListRouteState } from "../product.types";

import { EditProductForm } from "./EditProductForm";
import {
  EDIT_PRODUCT_TEXT,
  type EditProductFormValues,
} from "./EditProduct.types";
import {
  findProductById,
  toEditProductFormValues,
  toUpdateProductRequest,
} from "./EditProduct.utils";

export const EditProductPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (productId === undefined) {
        setError(PRODUCT_MESSAGES.NOT_FOUND);
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProducts();

        if (!response._success || response._data === undefined) {
          setError(response._message);
          return;
        }

        const selectedProduct = findProductById(response._data, productId);

        if (selectedProduct === null) {
          setError(PRODUCT_MESSAGES.NOT_FOUND);
          return;
        }

        setProduct(selectedProduct);
      } catch (requestError: unknown) {
        setError(getApiErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  const handleUpdateProduct = async (
    values: EditProductFormValues,
  ): Promise<boolean> => {
    if (productId === undefined) {
      setError(PRODUCT_MESSAGES.NOT_FOUND);
      return false;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await updateProduct(
        productId,
        toUpdateProductRequest(values),
      );

      if (!response._success) {
        setError(response._message);
        return false;
      }

      const navigationState: ProductListRouteState = {
        successMessage: PRODUCT_MESSAGES.UPDATED,
      };

      navigate(PROTECTED_ROUTES.PRODUCTS, { state: navigationState });

      return true;
    } catch (requestError: unknown) {
      setError(getApiErrorMessage(requestError));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p role="status">{EDIT_PRODUCT_TEXT.LOADING}</p>;
  }

  if (product === null) {
    return <p role="alert">{error ?? PRODUCT_MESSAGES.NOT_FOUND}</p>;
  }

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        {EDIT_PRODUCT_TEXT.TITLE}
      </h1>
      <EditProductForm
        error={error}
        initialValues={toEditProductFormValues(product)}
        isSubmitting={isSubmitting}
        onSubmit={handleUpdateProduct}
      />
    </section>
  );
};
