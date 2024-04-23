package com.example.classAppfileservice.service.fileHandler;

import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class XlsFileHandler implements FileHandler{

    @Autowired
    private ExcelConverter excelConverter;

    @Override
    public void readFile(MultipartFile multipartFile) throws IOException {
        HSSFWorkbook workbook = new HSSFWorkbook(multipartFile.getInputStream());
        readFileToJson(multipartFile);
    }

    @Override
    public JsonNode readFileToJson(MultipartFile multipartFile) throws IOException {
        HSSFWorkbook workbook = new HSSFWorkbook(multipartFile.getInputStream());
        return excelConverter.xlsToJson(workbook);
    }

    @Override
    public void writeFile(Object obj) {

    }
}
