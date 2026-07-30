import { useEffect, useMemo, useState } from "react";

import { UI_CONSTANTS } from "../../../constants/ui";
import type { Product } from "../../../services/api";

const matchesSearchQuery = (product: Product, query: string): boolean => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const category = product.category?.toLocaleLowerCase() ?? "";

  return (
    product.name.toLocaleLowerCase().includes(normalizedQuery) ||
    category.includes(normalizedQuery)
  );
};

export const useProductSearch = (products: readonly Product[]) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, UI_CONSTANTS.DEBOUNCE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => matchesSearchQuery(product, debouncedQuery)),
    [debouncedQuery, products],
  );

  return { filteredProducts, query, setQuery } as const;
};
