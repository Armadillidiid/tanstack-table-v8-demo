import { createColumnHelper } from "@tanstack/react-table";
import { JobItem } from "../hooks/types";

const columnHelper = createColumnHelper<JobItem>();

export const columns = [
  columnHelper.accessor("position", {
    id: "position",
    header: "Job Position",
    cell: (info) => (
      <div className="flex flex-col gap-6">
        <span className="text-[#1A1A1A] text-xl font-bold leading-[30px]">
          {info.getValue()}
        </span>
        <span className="text-[#595959] text-sm font-normal leading-[21px]">
          {info.row.original.industry}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("team", {
    id: "team",
    header: "Team",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("location", {
    id: "location",
    header: "Location",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("job_type", {
    id: "job_type",
    header: "Job Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date_posted", {
    id: "date_posted",
    header: "Date Posted",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    id: "view_job",
    header: "",
    cell: (info) => (
      <a
        href={`${location.pathname}${info.getValue()}/`}
        className="bg-primary p-2 text-white text-primary-foreground hover:bg-primary/90 inline-flex min-w-fit
        items-center justify-center rounded-md text-sm font-medium ring-offset-background 
        transition-colors focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
        disabled:opacity-50"
      >
        View Job
      </a>
    ),
  }),
];
