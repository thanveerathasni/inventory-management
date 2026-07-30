interface ProductSearchProps {
  readonly onQueryChange: (query: string) => void;
  readonly query: string;
}

export const ProductSearch = ({ onQueryChange, query }: ProductSearchProps) => (
  <label className="block max-w-sm">
    <span className="sr-only">Search products</span>
    <input
      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Search products"
      type="search"
      value={query}
    />
  </label>
);
