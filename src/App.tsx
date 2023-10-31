import useJobs from "./hooks/useJobs";
import { Table } from "./components/Table";
import { columns } from "./data/columns";

function App() {
  const query = useJobs();
  return (
    <div className="my-8">
      {!query.isPending && !query.isError && (
        <Table
          data={query.data?.results}
          columns={columns}
          defaultSortingState={[{ id: "position", desc: false }]}
        />
      )}
    </div>
  );
}

export default App;
