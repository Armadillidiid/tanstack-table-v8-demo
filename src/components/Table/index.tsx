import { useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./index.module.css";
import Pagination from "./Pagination";

type TableProps<TData> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  data: TData[];
  defaultSortingState?: { id: string; desc: boolean }[];
};

export const Table = <TData,>({
  columns,
  data,
  defaultSortingState,
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>(
    defaultSortingState ?? [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col gap-8">
      <table className={styles.table}>
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
    </div>
  );
};
