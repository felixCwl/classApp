package com.example.classAppfileservice.service.convert;

import com.example.classAppfileservice.service.fileHandler.FileHandlerProcessor;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileConverterServiceImpl implements FileConverterService{

    @Autowired
    private FileHandlerProcessor fileHandlerProcessor;

    @Override
    public JsonNode getXlsxToJson(MultipartFile files) throws IOException {
        return fileHandlerProcessor.readFileToJson(files);
    }
}
