import ReactDataGrid from "react-data-grid";

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "complete", name: "Complete" },
  { key: "issueType", name: "Task Type" },
];

/*const rows = [
  { id: 0, title: "Task 1", issueType: "Bug", complete: 20 },
  { id: 1, title: "Task 2", issueType: "Story", complete: 40 },
  { id: 2, title: "Task 3", issueType: "Epic", complete: 60 },
];*/

function ReactDataGridRoot() {
  return (
    <div
      style={{ display: "flex", width: "1500%", alignItems: "center", justifyContent: "center" }}
    >
      <ReactDataGrid columns={columns} rowGetter={0} />
    </div>
  );
}
export default ReactDataGridRoot;
