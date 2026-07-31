import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui";
import { PRODUCT_MESSAGES } from "../../../constants/messages";
import { PROTECTED_ROUTES } from "../../../constants/routes";
import { UI_CONSTANTS } from "../../../constants/ui";
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
  const navigate = useNavigate();

  const { error, products, removeProduct, status } = useProductList();

  const { filteredProducts, query, setQuery } = useProductSearch(products);

  const [page, setPage] = useState<number>(
    UI_CONSTANTS.PAGINATION.DEFAULT_PAGE,
  );

  const [pageSize, setPageSize] = useState<number>(
    UI_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE,
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / pageSize),
  );

  const paginatedProducts = useMemo(
    () =>
      filteredProducts.slice(
        (page - 1) * pageSize,
        page * pageSize,
      ),
    [filteredProducts, page, pageSize],
  );

  const handleQueryChange = useCallback(
    (nextQuery: string) => {
      setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
      setQuery(nextQuery);
    },
    [setQuery],
  );

  const handlePageSizeChange = useCallback((nextPageSize: number) => {
    setPage(UI_CONSTANTS.PAGINATION.DEFAULT_PAGE);
    setPageSize(nextPageSize);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!selectedProduct) return;

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
    } catch (error) {
      setDeleteError(getApiErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }, [removeProduct, selectedProduct]);

  if (status === PRODUCT_LIST_STATUS.LOADING) {
    return <ProductLoading />;
  }

  if (status === PRODUCT_LIST_STATUS.ERROR) {
    return (
      <section className="space-y-4">
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          role="alert"
        >
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Manage your inventory products.
          </p>
        </div>

        <Button
          onClick={() => navigate(PROTECTED_ROUTES.PRODUCT_CREATE)}
        >
          + Add Product
        </Button>
      </div>

      {successMessage && (
        <div
          aria-live="polite"
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-700"
        >
          {successMessage}
        </div>
      )}

      <ProductSearch
        query={query}
        onQueryChange={handleQueryChange}
      />

      {products.length === 0 ? (
        <ProductEmptyState />
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No matching products
          </h3>

          <p className="mt-2 text-slate-500">
            Try changing your search term.
          </p>
        </div>
      ) : (
        <>
          <ProductTable
            deletingProductId={
              isDeleting ? selectedProduct?._id ?? null : null
            }
            onDelete={setSelectedProduct}
            products={paginatedProducts}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            pageSizeOptions={
              UI_CONSTANTS.PAGINATION.PAGE_SIZE_OPTIONS
            }
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}

      {selectedProduct && (
        <DeleteProductDialog
          product={selectedProduct}
          error={deleteError}
          isDeleting={isDeleting}
          onCancel={() => setSelectedProduct(null)}
          onConfirm={handleDelete}
        />
      )}
    </section>
  );
};