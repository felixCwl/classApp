package com.example.classAppfileservice.service.fileHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ExcelConverter {
    private static ObjectMapper objectMapper = new ObjectMapper();

    public static JsonNode xlsxToJson(XSSFWorkbook excelFile) {
        return convertExcelWorkbook(excelFile);
    }

    public static JsonNode xlsToJson(HSSFWorkbook excelFile) {
        return convertExcelWorkbook(excelFile);
    }

    private static ObjectNode convertExcelWorkbook(Workbook workbook){
        ObjectNode excelData = objectMapper.createObjectNode();

        try {
            // Reading each sheet one by one
            for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
                Sheet sheet = workbook.getSheetAt(i);
                String sheetName = sheet.getSheetName();

                List<String> headers = new ArrayList<String>();
                ArrayNode sheetData = objectMapper.createArrayNode();
                // Reading each row of the sheet
                for (int j = 0; j <= sheet.getLastRowNum(); j++) {
                    Row row = sheet.getRow(j);
                    if (j == 0) {
                        // reading sheet header's name
                        for (int k = 0; k < row.getLastCellNum(); k++) {
                            headers.add(row.getCell(k).getStringCellValue());
                        }
                    } else {
                        // reading work sheet data
                        ObjectNode rowData = objectMapper.createObjectNode();
                        for (int k = 0; k < headers.size(); k++) {
                            Cell cell = row.getCell(k);
                            String headerName = headers.get(k);
                            if (cell != null) {
                                switch (cell.getCellType()) {
                                    case FORMULA:
                                        rowData.put(headerName, cell.getCellFormula());
                                        break;
                                    case BOOLEAN:
                                        rowData.put(headerName, cell.getBooleanCellValue());
                                        break;
                                    case NUMERIC:
                                        rowData.put(headerName, cell.getNumericCellValue());
                                        break;
                                    case BLANK:
                                        rowData.put(headerName, "");
                                        break;
                                    default:
                                        rowData.put(headerName, cell.getStringCellValue());
                                        break;
                                }
                            } else {
                                rowData.put(headerName, "");
                            }
                        }
                        sheetData.add(rowData);
                    }
                }
                excelData.set(sheetName, sheetData);
            }
        } catch (Exception e){
        }
        return excelData;
    }
}