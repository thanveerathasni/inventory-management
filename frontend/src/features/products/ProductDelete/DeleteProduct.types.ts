import type { Product } from "../../../services/api";

export interface DeleteProductDialogProps {
  readonly error: string | null;
  readonly isDeleting: boolean;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly product: Product;
}
