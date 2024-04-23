package com.example.classAppfileservice.service.fileHandler;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class FileHandlerProcessor {
    public void readFile(MultipartFile filename) throws IOException {
        FileHandler reader = FileHandlerFactory.createFileReader(filename.getOriginalFilename());
        reader.readFile(filename);
    }

    public JsonNode readFileToJson(MultipartFile filename) throws IOException {
        FileHandler reader = FileHandlerFactory.createFileReader(filename.getOriginalFilename());
        JsonNode result = reader.readFileToJson(filename);
        return result;
    }

}
