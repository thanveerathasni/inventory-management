interface PaginationProps {
  readonly onPageChange: (page: number) => void;
  readonly onPageSizeChange: (pageSize: number) => void;
  readonly page: number;
  readonly pageSize: number;
  readonly pageSizeOptions: readonly number[];
  readonly totalPages: number;
}

export const Pagination = ({
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  pageSizeOptions,
  totalPages,
}: PaginationProps) => (
  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700">
    <div className="flex items-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            className={
              pageNumber === page ? "font-semibold text-slate-950" : ""
            }
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            type="button"
          >
            {pageNumber}
          </button>
        ),
      )}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        Next
      </button>
    </div>

    <select
      aria-label="Products per page"
      onChange={(event) => onPageSizeChange(Number(event.target.value))}
      value={pageSize}
    >
      {pageSizeOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
