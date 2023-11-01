import PaginateButton from "./PaginateButton";
import PaginateGoto from "./PaginateGoto";
import { Table } from "@tanstack/react-table";

type PaginationProps<T> = {
  table: Table<T>;
  pageOptions: number[];
  pageRange: number;
  children?: React.ReactNode;
};

const Pagination = <T,>({
  table,
  pageOptions,
  pageRange,
  children,
}: PaginationProps<T>) => {
  return (
    <>
      <PaginateButton table={table} direction="first" />
      <PaginateButton table={table} direction="previous" />

      {pageOptions
        .slice(
          Math.max(0, table.getState().pagination.pageIndex - pageRange),
          table.getState().pagination.pageIndex + pageRange + 1,
        )
        .map((pageIndex) => (
          <PaginateButton
            key={pageIndex}
            table={table}
            direction="specific"
            page={pageIndex}
          />
        ))}

      <PaginateButton table={table} direction="next" />
      <PaginateButton table={table} direction="last" />

      {children && (
        <>
          <div className="w-[1px] bg-gray-600 h-5 self-center" />
          {children}
        </>
      )}
    </>
  );
};

Pagination.Goto = PaginateGoto;

export default Pagination;
