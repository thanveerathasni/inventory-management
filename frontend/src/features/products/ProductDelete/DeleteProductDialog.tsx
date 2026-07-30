import type { DeleteProductDialogProps } from "./DeleteProduct.types";
import { getDeleteConfirmationMessage } from "./DeleteProduct.utils";

export const DeleteProductDialog = ({
  error,
  isDeleting,
  onCancel,
  onConfirm,
  product,
}: DeleteProductDialogProps) => (
  <div
    className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4"
    role="dialog"
  >
    <section
      aria-modal="true"
      className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
    >
      <h2 className="text-lg font-semibold text-slate-900">Delete product</h2>
      <p className="mt-2 text-sm text-slate-600">
        {getDeleteConfirmationMessage(product)}
      </p>
      {error === null ? null : (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <button disabled={isDeleting} onClick={onCancel} type="button">
          Cancel
        </button>
        <button disabled={isDeleting} onClick={onConfirm} type="button">
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </section>
  </div>
);
