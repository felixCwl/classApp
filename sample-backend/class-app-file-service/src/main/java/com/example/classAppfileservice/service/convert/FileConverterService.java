package com.example.classAppfileservice.service.convert;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileConverterService {
    public JsonNode getXlsxToJson(MultipartFile files) throws IOException;

}
