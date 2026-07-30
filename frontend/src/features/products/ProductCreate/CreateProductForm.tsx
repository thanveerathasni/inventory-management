import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  CREATE_PRODUCT_TEXT,
  type CreateProductFormValues,
} from "./CreateProduct.types";
import { createProductSchema } from "./CreateProduct.validation";

interface CreateProductFormProps {
  readonly error: string | null;
  readonly initialValues: CreateProductFormValues;
  readonly isSubmitting: boolean;
  readonly onSubmit: (values: CreateProductFormValues) => Promise<boolean>;
  readonly submitLabel: string;
  readonly submittingLabel: string;
}

export const CreateProductForm = ({
  error,
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
  submittingLabel,
}: CreateProductFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateProductFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(createProductSchema),
  });

  const handleFormSubmit = async (
    values: CreateProductFormValues,
  ): Promise<void> => {
    const isCreated = await onSubmit(values);

    if (isCreated) {
      reset(initialValues);
    }
  };

  return (
    <form
      className="grid max-w-xl gap-5"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      <label
        className="grid gap-1.5 text-sm font-medium text-slate-700"
        htmlFor="name"
      >
        {CREATE_PRODUCT_TEXT.NAME}
        <input
          className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          id="name"
          type="text"
          {...register("name")}
        />
        {errors.name?.message === undefined ? null : (
          <span className="text-sm text-red-600">{errors.name.message}</span>
        )}
      </label>

      <label
        className="grid gap-1.5 text-sm font-medium text-slate-700"
        htmlFor="category"
      >
        {CREATE_PRODUCT_TEXT.CATEGORY}
        <input
          className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          id="category"
          type="text"
          {...register("category")}
        />
        {errors.category?.message === undefined ? null : (
          <span className="text-sm text-red-600">
            {errors.category.message}
          </span>
        )}
      </label>

      <label
        className="grid gap-1.5 text-sm font-medium text-slate-700"
        htmlFor="quantity"
      >
        {CREATE_PRODUCT_TEXT.QUANTITY}
        <input
          className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          id="quantity"
          min={0}
          type="number"
          {...register("quantity", { valueAsNumber: true })}
        />
        {errors.quantity?.message === undefined ? null : (
          <span className="text-sm text-red-600">
            {errors.quantity.message}
          </span>
        )}
      </label>

      <label
        className="grid gap-1.5 text-sm font-medium text-slate-700"
        htmlFor="price"
      >
        {CREATE_PRODUCT_TEXT.PRICE}
        <input
          className="rounded-md border border-slate-300 px-3 py-2 text-slate-900"
          id="price"
          min={0}
          step="any"
          type="number"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price?.message === undefined ? null : (
          <span className="text-sm text-red-600">{errors.price.message}</span>
        )}
      </label>

      {error === null ? null : <p role="alert">{error}</p>}

      <button
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
};
