import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

function MuiDataGridRoot({ inputRows, inputColumns }) {
  const [rows, setRows] = React.useState(inputRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    console.log(rowModesModel);
    setRowModesModel(newRowModesModel);
  };

  const handleButtonClick = () => {
    // Handle the button click event
    console.log(inputRows);
  };

  return (
    <Box
      sx={{
        width: "100%",
        "& .actions": {
          color: "text.primary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={inputRows}
        columns={inputColumns}
        //editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        /*slots={{
          toolbar: EditToolbar,
        }}*/
        /*slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}*/
      />
      <button onClick={handleButtonClick}>Retrieve Data</button>
    </Box>
  );
}

MuiDataGridRoot.propTypes = {
  inputRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MuiDataGridRoot;
