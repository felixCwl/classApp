package com.example.classAppfileservice.controller;

import com.example.classAppfileservice.service.convert.FileConverterService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/${file-service-endpoint.file-converter-path}")
public class FileConverterController {
    @Autowired
    private FileConverterService fileConverterService;

    @PostMapping(value = "/getXlsxToJson")
    public ResponseEntity<JsonNode> getXlsxToJson(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(fileConverterService.getXlsxToJson(file));
    }
}
