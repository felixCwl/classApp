package com.example.classAppClassService.model;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
public class ClassDivisionDto implements Serializable {
    private MultipartFile multipartFile;
    private ClassDivisionExpectedInput classDivisionExpectedInput;
    private int classRankLimit;
    private String firstClassName;
    private JsonNode excelJsonData;
}
