import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PRODUCT_MESSAGES } from "../../../constants/messages";
import { PROTECTED_ROUTES } from "../../../constants/routes";
import { createProduct } from "../../../services/api";
import { getApiErrorMessage } from "../../auth/auth.utils";
import type { ProductListRouteState } from "../product.types";

import { CreateProductForm } from "./CreateProductForm";
import {
  CREATE_PRODUCT_DEFAULT_VALUES,
  CREATE_PRODUCT_TEXT,
  type CreateProductFormValues,
} from "./CreateProduct.types";
import { toCreateProductRequest } from "./CreateProduct.utils";

export const CreateProductPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreateProduct = async (
    values: CreateProductFormValues,
  ): Promise<boolean> => {
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await createProduct(toCreateProductRequest(values));

      if (!response._success) {
        setError(response._message);
        return false;
      }

      const navigationState: ProductListRouteState = {
        successMessage: PRODUCT_MESSAGES.CREATED,
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

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        {CREATE_PRODUCT_TEXT.TITLE}
      </h1>
      <CreateProductForm
        error={error}
        initialValues={CREATE_PRODUCT_DEFAULT_VALUES}
        isSubmitting={isSubmitting}
        onSubmit={handleCreateProduct}
        submitLabel={CREATE_PRODUCT_TEXT.CREATE}
        submittingLabel={CREATE_PRODUCT_TEXT.CREATING}
      />
    </section>
  );
};
