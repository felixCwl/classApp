package com.example.classAppClassService.services;

import com.example.classAppClassService.model.ClassDivisionDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;

public interface ClassDivisionService {
    public JsonNode generateClassDivisionResult(ClassDivisionDto classDivisionDto) throws JsonProcessingException;
}
