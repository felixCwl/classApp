package com.example.classAppfileservice.service.fileHandler;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface  FileHandler {
    public void readFile(MultipartFile obj) throws IOException;

    public JsonNode readFileToJson(MultipartFile obj) throws IOException;
    public void writeFile(Object obj);

}
