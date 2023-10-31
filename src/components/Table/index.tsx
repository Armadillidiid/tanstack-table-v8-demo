import { useState, useMemo } from "react";
import {
  ColumnDef,
  SortingState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnSort,
} from "@tanstack/react-table";
import styles from "./index.module.css";
import Pagination from "./Pagination";
import Filter from "./Filter";

type TableProps<TData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  data: TData[];
  defaultPaginationState?: PaginationState;
  defaultSortingState?: ColumnSort[];
  globalFilter?: {
    value: string;
    dispatch: (value: string) => void;
  };
  children?: React.ReactNode;
};

const Table = <TData,>({
  columns,
  data,
  defaultPaginationState,
  defaultSortingState,
  globalFilter,
  children,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>(
    defaultSortingState ?? [{ id: "", desc: false }],
  );

  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex: defaultPaginationState?.pageIndex ?? 0,
      pageSize: defaultPaginationState?.pageSize ?? 10,
    }),
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter: globalFilter?.value,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: globalFilter?.dispatch,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      {/* SEARCH INPUT */}
      {children}

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.tableHead}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.tableBody}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex w-full justify-center items-center gap-4 max-w-7xl mx-auto">
        <Pagination
          table={table}
          pageRange={3}
          pageOptions={table.getPageOptions()}
        >
          <Pagination.Goto table={table} options={[10, 20, 30, 40, 50]} />
        </Pagination>
      </div>
    </>
  );
};

Table.Filter = Filter;

export default Table;
