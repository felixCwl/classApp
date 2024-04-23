package com.example.classAppfileservice.service.fileHandler;

import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class CsvFileHandler implements FileHandler{

    @Autowired
    private ExcelConverter excelConverter;

    @Override
    public void readFile(MultipartFile multipartFile) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook(multipartFile.getInputStream());
        readFileToJson(multipartFile);
    }

    @Override
    public JsonNode readFileToJson(MultipartFile multipartFile) throws IOException {
        XSSFWorkbook workbook = new XSSFWorkbook(multipartFile.getInputStream());
        return excelConverter.xlsxToJson(workbook);
    }

    @Override
    public void writeFile(Object obj) {

    }
}
