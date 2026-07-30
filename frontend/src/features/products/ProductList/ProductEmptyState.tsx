import { PRODUCT_LIST_TEXT } from "../product.types";

export const ProductEmptyState = () => (
  <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
    <h2 className="text-base font-semibold text-slate-900">
      {PRODUCT_LIST_TEXT.EMPTY_TITLE}
    </h2>
    <p className="mt-2 text-sm text-slate-600">
      {PRODUCT_LIST_TEXT.EMPTY_DESCRIPTION}
    </p>
  </section>
);
