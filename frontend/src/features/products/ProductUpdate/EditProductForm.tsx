import { CreateProductForm } from "../ProductCreate";

import {
  EDIT_PRODUCT_TEXT,
  type EditProductFormValues,
} from "./EditProduct.types";

interface EditProductFormProps {
  readonly error: string | null;
  readonly initialValues: EditProductFormValues;
  readonly isSubmitting: boolean;
  readonly onSubmit: (values: EditProductFormValues) => Promise<boolean>;
}

export const EditProductForm = ({
  error,
  initialValues,
  isSubmitting,
  onSubmit,
}: EditProductFormProps) => (
  <CreateProductForm
    error={error}
    initialValues={initialValues}
    isSubmitting={isSubmitting}
    onSubmit={onSubmit}
    submitLabel={EDIT_PRODUCT_TEXT.SAVE}
    submittingLabel={EDIT_PRODUCT_TEXT.SAVING}
  />
);
