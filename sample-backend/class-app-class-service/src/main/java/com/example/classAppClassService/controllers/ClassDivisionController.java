package com.example.classAppClassService.controllers;

import com.example.classAppClassService.model.ClassDivisionDto;
import com.example.classAppClassService.request.ClassDivisionRequest;
import com.example.classAppClassService.services.ClassDivisionService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@RestController
@RequestMapping("/class-division")
public class ClassDivisionController {
    @Autowired
    private ClassDivisionService classDivisionService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping(value = "generateClassDivisionResult", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JsonNode> generateClassDivisionResult(@RequestPart("file") MultipartFile multipartFile, @RequestPart("classDivisionRequest") ClassDivisionRequest classDivisionRequest) {
        ClassDivisionDto classDivisionDto = modelMapper.map(classDivisionRequest, ClassDivisionDto.class);
        classDivisionDto.setMultipartFile(multipartFile);
        JsonNode jsonNode;
        try {
            jsonNode = classDivisionService.generateClassDivisionResult(classDivisionDto);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(jsonNode);
    }

    @PostMapping("uploadAndPreview")
    public ResponseEntity uploadAndPreview(@RequestParam("file") MultipartFile file){
        return null;
    }

}
