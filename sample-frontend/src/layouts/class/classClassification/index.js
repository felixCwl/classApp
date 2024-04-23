import { useState, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// sample React components
import SampleButton from "components/SampleButton";
import { FileUploader } from "components/FileUploader";

// sample React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ClassClassificationRequestModel from "components/request/classClassification/ClassClassificationRequestModel";
import ClassGradeExpectedInputModel from "components/request/classClassification/ClassGradeExpectedInputModel";
import { Container, Icon, Alert, AlertTitle } from "@mui/material";
import MuiDataGridColumn from "components/Table/muiDataGrid/MuiDataGridColumn";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import {
  GridEditInputCell,
  GridCellModes,
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridRowEditStopReasons,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import SampleBox from "components/SampleBox";

function ShowPopupMsg(props) {
  const { message, setMessage } = props;
  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      This is a success Alert with an encouraging title.
    </Alert>
  );
}

function CustomDataGrid(props) {
  const { responseRows, setResponseRows } = props;
  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    downloadCsv();
  }, [responseRows]);

  const downloadCsv = () => {
    if (!responseRows || responseRows.length > 0) {
      const formattedData = responseRows.map((row) => ({
        // Map the row data to match the CSV format
        CLASS: row.className,
        "CLASS NO": row.classNumber,
        eng_name: row.studentEnglishName,
        chi_name: row.studentChineseName,
        sex: row.studentGender,
        "2_discip": row.studentDisciple,
        "3_rank_class": row.studentClassRank,
        "3_rank_all": row.studentGradeRank,
        Remarks: row.remark,
        "NEW CLASS": row.newClassName,
        // Map other fields as needed
      }));
      setCsvData(formattedData);
    } else {
      const emptyDataString = [
        {
          // Map the row data to match the CSV format
          CLASS: "",
          "CLASS NO": "",
          eng_name: "",
          chi_name: "",
          sex: "",
          "2_discip": "",
          "3_rank_class": "",
          "3_rank_all": "",
          Remarks: "",
          "NEW CLASS": "",
          // Map other fields as needed
        },
      ];
      setCsvData(emptyDataString);
    }
  };

  const exportToExcel = async () => {
    downloadCsv();
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `export.xlsx`);
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button onClick={exportToExcel}>
        <Icon>download</Icon>Download
      </Button>
    </GridToolbarContainer>
  );
}

function ClassClassification() {
  const [controller] = useMaterialUIController();
  const { darkMode, sidenavColor } = controller;
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const classOutputNumberArray = [];
  const classOutputNameArray = [];
  const rankLimitNumberArray = [];
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (openAlert) {
      const timer = setTimeout(() => {
        setOpenAlert(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [openAlert]);

  const setAlertMessageContent = (selectedSeverity, customMessage) => {
    setAlertSeverity(selectedSeverity);
    setAlertMessage(customMessage);
    setOpenAlert(true);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    setAllowSubmit(true);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const [allowSubmit, setAllowSubmit] = useState(false);

  const handleButtonClick = (event) => {
    // Handle the button click event
    handleSubmit(event);
  };

  const handleClearData = (event) => {
    setResponseRows([
      {
        className: "",
        classNumber: "",
        studentEnglishName: "",
        studentChineseName: "",
        studentGender: "",
        studentDisciple: "",
        studentClassRank: "",
        studentGradeRank: "",
        remark: "",
        newClassName: "",
      },
    ]);
  };

  for (let i = 1; i <= 7; i++) {
    classOutputNumberArray.push(i);
  }
  for (let i = 0; i <= 6; i++) {
    classOutputNameArray.push(String.fromCharCode(65 + i));
  }
  for (let i = 1; i <= 50; i++) {
    rankLimitNumberArray.push(i);
  }

  const inputRows = [
    {
      id: 1,
      grade: "1",
      numberOfClass: classOutputNumberArray[5],
      firstClassName: "A",
      rankLimit: rankLimitNumberArray[49],
    },
    {
      id: 2,
      grade: "2",
      numberOfClass: classOutputNumberArray[5],
      firstClassName: "A",
      rankLimit: rankLimitNumberArray[49],
    },
    {
      id: 3,
      grade: "3",
      numberOfClass: classOutputNumberArray[5],
      firstClassName: "A",
      rankLimit: rankLimitNumberArray[49],
    },
    {
      id: 4,
      grade: "4",
      numberOfClass: classOutputNumberArray[5],
      firstClassName: "A",
      rankLimit: rankLimitNumberArray[49],
    },
    {
      id: 5,
      grade: "5",
      numberOfClass: classOutputNumberArray[5],
      firstClassName: "A",
      rankLimit: rankLimitNumberArray[49],
    },
    {
      id: 6,
      grade: "6",
      numberOfClass: classOutputNumberArray[4],
      firstClassName: "A",
      rankLimit: rankLimitNumberArray[49],
    },
  ];

  const [rows, setRows] = useState(inputRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [responseRows, setResponseRows] = useState([]);

  const handleFile = (file) => {
    console.log(file);
    if (file) {
      setFile(file);
      setFileName(file.name);
      setAllowSubmit(true);
      setAlertMessageContent("success", "Successfully uploaded file: " + file.name);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var header = new Headers();
    header.append("Accept", "*/*");
    header.append("Content-Type", "multipart/form-data");
    var formdata = new FormData();
    var inputMap = {};
    for (var i = 0; i < rows.length; i++) {
      if (!rows[i].numberOfClass || !rows[i].numberOfClass > 0) {
        setAlertMessageContent("warning", "Number Of Class not valided");
        return;
      }

      if (!rows[i].firstClassName || !classOutputNameArray.includes(rows[i].firstClassName)) {
        setAlertMessageContent("warning", "New Class Name not valided");
        return;
      }
      var gradeExpectedInputMap = new ClassGradeExpectedInputModel(
        rows[i].numberOfClass,
        rows[i].firstClassName,
        rows[i].rankLimit
      );

      inputMap[i + 1] = gradeExpectedInputMap;
    }

    var classDivisionRequestBody = new ClassClassificationRequestModel(inputMap);

    var blob = new Blob([JSON.stringify(classDivisionRequestBody)], { type: "application/json" });
    formdata.append("classDivisionRequest", blob);
    formdata.append("file", file);
    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch("http://localhost:8086/class-division/generateClassDivisionResult", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setResponseRows(JSON.parse(result));
        setAlertMessageContent("success", "Successfully generate data from uploaded file!");
      })
      .catch((error) => setAlertMessageContent("warning", error.message));

    console.log(responseRows);
  };

  const [cellModesModel, setCellModesModel] = useState({});

  const handleCellModesModelChange = useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

  const handleCellEditStop = useCallback((params, event) => {
    // if (!params.isEditable) {
    //   return;
    // }
    setAllowSubmit(false);
    // Ignore portal
    if (event === undefined) {
      return;
    }

    if (event.target === undefined) {
      return;
    }

    setCellModesModel((newModel) => {
      return {
        // Revert the mode of the other cells from other rows
        ...Object.keys(newModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(newModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          // Revert the mode of other cells in the same row
          ...Object.keys(newModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
            {}
          ),
          [params.field]: { mode: GridCellModes.View },
        },
      };
    });
  }, []);

  const handleCellClick = useCallback(async (params, event) => {
    setAllowSubmit(false);

    if (!params.isEditable) {
      setAllowSubmit(true);
      return;
    }

    // Ignore portal
    if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
      handleCellEditStop((params, event));
      return;
    }

    setCellModesModel((prevModel) => {
      return {
        // Revert the mode of the other cells from other rows
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          // Revert the mode of other cells in the same row
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
            {}
          ),
          [params.field]: { mode: GridCellModes.Edit },
        },
      };
    });
  }, []);

  const rankLimit = (params) => (
    <GridEditInputCell
      {...params}
      inputProps={{
        max: 10,
        min: 0,
      }}
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <>
            <FileUploader handleFile={handleFile} />
          </>
        </Grid>
        <Grid item xs={3}>
          {fileName ? <p>Uploaded file: {fileName}</p> : null}
        </Grid>
        <Grid item xs={3}>
          {/* <Box
            sx={{
              justifyContent: "center",
              width: "100%",
              "& .actions": {
                color: "text.primary",
              },
              "& .textPrimary": {
                color: "text.primary",  
              },
            }}
          > */}
          <div style={{ width: "100%" }}>
            <DataGrid
              color={darkMode ? "white" : "secondary"}
              rows={rows}
              sx={{
                "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
                  color: darkMode ? "grey" : "secondary",
                  fontWeight: 700,
                },
              }}
              rowSelection={false}
              columns={[
                {
                  field: "grade",
                  headerName: "Grade",
                  width: 100,
                  type: "text",
                  align: "center",
                  sortable: false,
                  headerAlign: "center",
                  editable: false,
                },
                {
                  field: "numberOfClass",
                  headerName: "Number Of Class",
                  width: 200,
                  type: "number",
                  align: "center",
                  sortable: false,
                  headerAlign: "center",
                  editable: true,
                  renderEditCell: (params) => (
                    <GridEditInputCell
                      {...params}
                      inputProps={{
                        max: 6,
                        min: 1,
                      }}
                    />
                  ),
                },
                {
                  field: "firstClassName",
                  headerName: "First Class Name",
                  width: 200,
                  type: "singleSelect",
                  align: "center",
                  sortable: false,
                  headerAlign: "center",
                  editable: true,
                  valueOptions: classOutputNameArray,
                },
                {
                  field: "rankLimit",
                  headerName: "Rank Limit",
                  width: 200,
                  type: "number",
                  align: "center",
                  sortable: false,
                  headerAlign: "center",
                  editable: true,
                  renderEditCell: (params) => (
                    <GridEditInputCell
                      {...params}
                      inputProps={{
                        max: 50,
                        min: 0,
                      }}
                    />
                  ),
                },
              ]}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              cellModesModel={cellModesModel}
              onCellModesModelChange={handleCellModesModelChange}
              onCellClick={handleCellClick}
              onCellEditStop={handleCellEditStop}
              processRowUpdate={processRowUpdate}
              hideFooterPagination={true}
              hideFooter={true}
              disableColumnFilter={true}
              disableColumnMenu={true}
              disableDensitySelector={true}
              disableColumnSorting
            />
          </div>
          {/* </Box> */}
        </Grid>

        <Grid item xs={3}>
          <SampleButton
            color={sidenavColor}
            onClick={handleButtonClick}
            disabled={!file || !allowSubmit}
          >
            Generate
          </SampleButton>
        </Grid>

        <Grid item xs={3}>
          <SampleButton color={sidenavColor} onClick={handleClearData}>
            Clear Data
          </SampleButton>
        </Grid>

        <Grid item xs={3}>
          {/* <Box
            sx={{
              width: "102%",
              "& .actions": {
                color: "text.primary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
              justifyContent: "center",
            }}
          > */}
          <div style={{ height: 300, width: "102%" }}>
            <DataGrid
              autoHeight
              sx={{
                "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
                  //backgroundColor: "blue",
                  color: darkMode ? "grey" : "secondary",
                  fontWeight: 700,
                  width: "100%",
                  justifyContent: "center",
                },
              }}
              color={darkMode ? "white" : "secondary"}
              rows={
                responseRows.length > 0
                  ? responseRows
                  : [
                      {
                        className: "",
                        classNumber: "",
                        studentEnglishName: "",
                        studentChineseName: "",
                        studentGender: "",
                        studentDisciple: "",
                        studentClassRank: "",
                        studentGradeRank: "",
                        remark: "",
                        newClassName: "",
                      },
                    ]
              }
              columns={[
                new MuiDataGridColumn("className", "CLASS", 100, "text", "center", false, []),
                new MuiDataGridColumn("classNumber", "CLASS NO", 100, "text", "center", false, []),
                new MuiDataGridColumn(
                  "studentEnglishName",
                  "eng_name",
                  100,
                  "text",
                  "center",
                  false,
                  []
                ),
                new MuiDataGridColumn(
                  "studentChineseName",
                  "chi_name",
                  100,
                  "text",
                  "center",
                  false,
                  []
                ),
                new MuiDataGridColumn("studentGender", "sex", 100, "text", "center", false, []),
                new MuiDataGridColumn(
                  "studentDisciple",
                  "2_discip",
                  100,
                  "text",
                  "center",
                  false,
                  []
                ),
                new MuiDataGridColumn(
                  "studentClassRank",
                  "3_rank_class",
                  100,
                  "text",
                  "center",
                  false,
                  []
                ),
                new MuiDataGridColumn(
                  "studentGradeRank",
                  "3_rank_all",
                  100,
                  "text",
                  "center",
                  false,
                  []
                ),
                new MuiDataGridColumn("remark", "Remarks", 100, "text", "center", false, []),
                new MuiDataGridColumn(
                  "newClassName",
                  "NEW CLASS",
                  100,
                  "text",
                  "center",
                  false,
                  []
                ),
              ]}
              getRowId={(row) =>
                row.newGrade +
                row.newClassName +
                row.studentEnglishName +
                row.studentGradeRank +
                row.grade +
                row.className
              }
              slots={{ toolbar: CustomDataGrid }}
              slotProps={{
                toolbar: { responseRows, setResponseRows },
              }}
              rowSelection={false}
            />
          </div>
          {/* </Box> */}
        </Grid>
      </Grid>
      <div
        style={{ position: "fixed", right: "25px", bottom: "100px", width: "15%", height: "5%" }}
      >
        <Alert
          severity={alertSeverity}
          //onClose={handleAlertClose}
          sx={{ marginTop: "1rem", display: openAlert ? "block" : "none" }}
        >
          {alertMessage}
          {/* <AlertTitle>{alertSeverity.charAt(0).toUpperCase() + alertSeverity.slice(1)}</AlertTitle>
          {alertMessage} */}
        </Alert>
      </div>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

CustomDataGrid.propTypes = {
  responseRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  setResponseRows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ShowPopupMsg.propTypes = {
  message: PropTypes.arrayOf(PropTypes.object).isRequired,
  setMessage: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClassClassification;
