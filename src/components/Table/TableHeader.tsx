import { Column } from "@tanstack/react-table";

type TableHeaderProps<T> = {
  title: string;
  column: Column<T>;
};

const TableHeader = <T,>(props: TableHeaderProps<T>) => {
  return (
    <>
      {props.column.getCanSort() === true ? (
        <button
          className="cursor-pointer select-none"
          onClick={() =>
            props.column.toggleSorting(
              props.column.getIsSorted() === "desc" ||
                props.column.getIsSorted() === false
                ? false
                : true,
            )
          }
        >
          {{
            asc: "🔼 ",
            desc: "🔽 ",
          }[props.column.getIsSorted() as string] ?? null}
          {props.title}
        </button>
      ) : (
        <span>{props.title}</span>
      )}
    </>
  );
};

export default TableHeader;
