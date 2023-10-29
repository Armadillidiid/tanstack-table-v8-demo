import { Table } from "@tanstack/react-table";

type PaginateButtonProps<T> = {
  table: Table<T>;
} & (
  | {
      direction: "current";
      page: number;
    }
  | {
      direction: "next" | "previous" | "first" | "last";
    }
);

const PaginateButton = <T,>(props: PaginateButtonProps<T>) => {
  if (
    props.direction === "next" ||
    props.direction === "previous" ||
    props.direction === "first" ||
    props.direction === "last"
  ) {
    return (
      <button
        className="border rounded p-1"
        onClick={
          props.direction === "next"
            ? () => props.table.nextPage()
            : props.direction === "previous"
            ? () => props.table.previousPage()
            : props.direction === "first"
            ? () => props.table.setPageIndex(0)
            : () => props.table.setPageIndex(props.table.getPageCount() - 1)
        }
        disabled={
          (props.direction === "next" && !props.table.getCanNextPage()) ||
          (props.direction === "previous" &&
            !props.table.getCanPreviousPage()) ||
          (props.direction === "first" &&
            props.table.getState().pagination.pageIndex === 0) ||
          (props.direction === "last" &&
            props.table.getState().pagination.pageIndex ===
              props.table.getPageCount() - 1)
        }
      >
        {props.direction === "next"
          ? ">"
          : props.direction === "previous"
          ? "<"
          : props.direction === "first"
          ? "<<"
          : ">>"}
      </button>
    );
  } else if (props.direction === "current") {
    return (
      <button
        className={`${
          props.table.getState().pagination.pageIndex === props.page
            ? "bg-primary text-white"
            : ""
        } border rounded p-1`}
        onClick={() => props.table.setPageIndex(props.page)}
      >
        {props.page + 1}
      </button>
    );
  }
};

export default PaginateButton;
