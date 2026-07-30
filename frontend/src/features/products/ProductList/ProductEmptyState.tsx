import { PackageOpen } from "lucide-react";

import { PRODUCT_LIST_TEXT } from "../product.types";

export const ProductEmptyState = () => (
  <section className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center transition-colors hover:bg-slate-50">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
      <PackageOpen className="h-6 w-6 text-slate-500" />
    </div>
    <h3 className="mt-4 text-base font-semibold text-slate-900">
      {PRODUCT_LIST_TEXT.EMPTY_TITLE}
    </h3>
    <p className="mt-1 text-sm text-slate-500">
      {PRODUCT_LIST_TEXT.EMPTY_DESCRIPTION}
    </p>
  </section>
);
