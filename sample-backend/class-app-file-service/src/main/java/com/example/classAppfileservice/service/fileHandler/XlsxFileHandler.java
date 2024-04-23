package com.example.classAppfileservice.service.fileHandler;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class XlsxFileHandler implements FileHandler{

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
