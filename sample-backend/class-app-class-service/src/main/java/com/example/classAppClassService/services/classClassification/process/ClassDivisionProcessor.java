package com.example.classAppClassService.services.classClassification.process;


import com.example.classAppClassService.model.ClassDivisionProcessDto;

import java.util.List;

public abstract class ClassDivisionProcessor {
    private ClassDivisionProcessor nextProcessor;
    public static ClassDivisionProcessor link(ClassDivisionProcessor first, ClassDivisionProcessor... chain) {
        ClassDivisionProcessor head = first;
        for (ClassDivisionProcessor nextInChain: chain) {
            head.nextProcessor = nextInChain;
            head = nextInChain;
        }
        return first;
    }
    public abstract void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList);
    public void processNext(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
        if (nextProcessor == null) {
            return;
        }
        nextProcessor.processData(classDivisionProcessDtoList);
    }
}
