class MuiDataGridColumn {
  constructor(
    field = "",
    headerName = "",
    width = 50,
    type = "",
    align = "center",
    editable = false,
    valueOptions = [],
    editCellProps = {}
  ) {
    this.mode = this.field = field;
    this.headerName = headerName;
    this.width = width;
    this.type = type;
    this.align = align;
    this.editable = editable;
    this.valueOptions = valueOptions;
    this.editCellProps = editCellProps;
  }
}

export default MuiDataGridColumn;
