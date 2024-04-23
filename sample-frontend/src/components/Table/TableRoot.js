import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

function DataTable({ rows, columns }) {
  return (
    <div style={{ display: "flex", width: "150%", alignItems: "center", justifyContent: "center" }}>
      <DataGrid
        isRowSelectable={isRowSelectable}
        rows={rows1}
        columns={columns1}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //checkboxSelection
      />
    </div>
  );
}

const columns1 = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "dropdown",
    width: 90,
    source: [1, 2],
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => "${params.row.firstName || ''} ${params.row.lastName || ''}",
  },
];

const rows1 = [
  { id: 1, lastName: "Snow", firstName: "Rossini", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Rossini", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Rossini", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Rossini", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Rossini", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Rossini", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const isRowSelectable = (params) => {
  // Add your logic here to determine if the row is selectable
  // For example, you can return true or false based on some condition
  return false;
};

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
