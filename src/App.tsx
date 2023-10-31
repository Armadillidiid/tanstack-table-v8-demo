import useJobs from "./hooks/useJobs";
import Table from "./components/Table";
import { columns } from "./data/columns";
import { useState } from "react";

function App() {
  const query = useJobs();
  const [globalFilter, setGlobalFilter] = useState("");

  const handleFilter = (value: string | number) => {
    setGlobalFilter(String(value));
  };

  return (
    <div className="my-8 container mx-auto">
      {!query.isPending && !query.isError && (
        <div className="flex flex-col gap-4">
          <Table
            data={query.data?.results}
            columns={columns}
            defaultSortingState={[{ id: "position", desc: false }]}
            globalFilter={{
              value: globalFilter,
              dispatch: setGlobalFilter,
            }}
          >
            <Table.Filter
              value={globalFilter}
              onChange={handleFilter}
              placeholder="Search"
            />
          </Table>
        </div>
      )}
    </div>
  );
}

export default App;
