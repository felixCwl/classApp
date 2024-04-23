package com.example.classAppClassService.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Map;

@Data
public class ClassDivisionExpectedInput implements Serializable {
    private Map<Integer, ClassGradeExpectedInput> classGradeExpectedInputMap;
}
