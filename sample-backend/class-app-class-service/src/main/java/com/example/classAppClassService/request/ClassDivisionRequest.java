package com.example.classAppClassService.request;

import com.example.classAppClassService.model.ClassGradeExpectedInput;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Map;

@Data
public class ClassDivisionRequest implements Serializable {
    private Map<Integer, ClassGradeExpectedInput> classGradeExpectedInputMap;
    private int classRankLimit;
    private String firstClassName;
}
