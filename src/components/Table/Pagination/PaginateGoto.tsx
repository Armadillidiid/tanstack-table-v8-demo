import { Table } from "@tanstack/react-table";

type PaginateGotoProps<T> = {
  table: Table<T>;
  options: number[];
};

const PaginateGoto = <T,>({ table, options }: PaginateGotoProps<T>) => {
  return (
    <>
      <span className="flex items-center gap-1">
        Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {options.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </>
  );
};

export default PaginateGoto;
