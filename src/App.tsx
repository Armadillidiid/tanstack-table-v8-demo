import useJobs from "./hooks/useJobs";
import { DataTable } from "./components/Table";
import { columns } from "./data/columns";

function App() {
  const query = useJobs();

  return (
    <div className="my-8">
      {!query.isPending && !query.isError && (
        <DataTable data={query.data?.results} columns={columns} />
      )}
    </div>
  );
}

export default App;
