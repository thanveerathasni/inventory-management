import { useCallback, useMemo, useState } from "react";

import { UI_CONSTANTS } from "../../../constants/ui";
import { PRODUCT_MESSAGES } from "../../../constants/messages";
import { deleteProduct, type Product } from "../../../services/api";
import { getApiErrorMessage } from "../../auth/auth.utils";
import { DeleteProductDialog } from "../ProductDelete";
import { Pagination } from "../ProductPagination";
import { ProductSearch, useProductSearch } from "../ProductSearch";
import { PRODUCT_LIST_STATUS } from "../product.types";

import { ProductEmptyState } from "./ProductEmptyState";
import { ProductLoading } from "./ProductLoading";
import { ProductTable } from "./ProductTable";
import { useProductList } from "./useProductList";

export const ProductListPage = () => {
  const { error, products, removeProduct, status } = useProductList();
  const { filteredProducts, query, setQuery } = useProductSearch(products);
  const [page, setPage] = useState<number>(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(
    UI_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = useMemo(
    () => filteredProducts.slice((page - 1) * pageSize, page * pageSize),
    [filteredProducts, page, pageSize],
  );

  const handleQueryChange = useCallback(
    (nextQuery: string): void => {
      setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
      setQuery(nextQuery);
    },
    [setQuery],
  );

  const handlePageSizeChange = useCallback((nextPageSize: number): void => {
    setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
    setPageSize(nextPageSize);
  }, []);

  const handleDelete = useCallback(async (): Promise<void> => {
    if (selectedProduct === null) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await deleteProduct(selectedProduct._id);
      if (!response._success) {
        setDeleteError(response._message);
        return;
      }
      removeProduct(selectedProduct._id);
      setSelectedProduct(null);
      setSuccessMessage(PRODUCT_MESSAGES.DELETED);
    } catch (requestError: unknown) {
      setDeleteError(getApiErrorMessage(requestError));
    } finally {
      setIsDeleting(false);
    }
  }, [removeProduct, selectedProduct]);

  if (status === PRODUCT_LIST_STATUS.LOADING) return <ProductLoading />;
  if (status === PRODUCT_LIST_STATUS.ERROR) return <p role="alert">{error}</p>;
  if (products.length === 0) return <ProductEmptyState />;
  if (filteredProducts.length === 0) return <ProductEmptyState />;

  return (
    <section className="grid gap-4">
      {successMessage === null ? null : <p aria-live="polite">{successMessage}</p>}
      <ProductSearch onQueryChange={handleQueryChange} query={query} />
      <ProductTable
        deletingProductId={isDeleting ? (selectedProduct?._id ?? null) : null}
        onDelete={setSelectedProduct}
        products={paginatedProducts}
      />
      <Pagination
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={UI_CONSTANTS.PAGINATION.PAGE_SIZE_OPTIONS}
        totalPages={totalPages}
      />
      {selectedProduct === null ? null : (
        <DeleteProductDialog
          error={deleteError}
          isDeleting={isDeleting}
          onCancel={() => setSelectedProduct(null)}
          onConfirm={handleDelete}
          product={selectedProduct}
        />
      )}
    </section>
  );
};
