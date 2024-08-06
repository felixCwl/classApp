package com.example.classAppClassService.services;

import com.example.classAppClassService.entity.ClassDivisionExcel;
import com.example.classAppClassService.feign.FileServiceFeign;
import com.example.classAppClassService.model.ClassDivisionDto;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.model.ClassDivisionResultDto;
import com.example.classAppClassService.model.ClassGradeExpectedInput;
import com.example.classAppClassService.services.classClassification.ClassDivisionUtil;
import com.example.classAppClassService.services.classClassification.process.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@Service
public class ClassDivisionServiceImpl implements ClassDivisionService {

  @Autowired private FileServiceFeign fileServiceFeign;

  @Override
  public JsonNode generateClassDivisionResult(ClassDivisionDto classDivisionDto)
      throws JsonProcessingException {
    ResponseEntity responseEntity =
        fileServiceFeign.getXlsxToJson(classDivisionDto.getMultipartFile());
    JsonNode classExcelJsonNode = (JsonNode) responseEntity.getBody();
    List<ClassDivisionExcel> classDivisionExcels =
        ClassDivisionUtil.convertJsonNodeToClassExcelList(classExcelJsonNode);
    List<ClassDivisionProcessDto> classDivisionProcessDtoList = new ArrayList<>();
    classDivisionProcessDtoList =
        ClassDivisionUtil.convertExcelDtoToProcessDto(classDivisionExcels);

    Map<Integer, List<ClassDivisionProcessDto>> gradeGroupProcessDtoMap =
        classDivisionProcessDtoList.stream()
            .collect(Collectors.groupingBy(ClassDivisionProcessDto::getOriginalGrade));

    List<ClassDivisionProcessDto> resultDtoList = new ArrayList<>();

    gradeGroupProcessDtoMap.forEach(
        (grade, dtoList) -> {
            int newGrade = grade+1;
          ClassDivisionProcessor classDivisionProcessor =
              ClassDivisionProcessor.link(
                  new ClassDivisionPreHandleData(),
                  new ClassDivisionSorting(newGrade, classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(newGrade)),
                  new ClassDivisionGenderSwap(newGrade, classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(newGrade)),
                  new ClassDivisionDisciplineSwap(newGrade, classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(newGrade)),
                  new ClassDivisionRetainSwap(newGrade,classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(newGrade)));
          classDivisionProcessor.processData(dtoList);
          resultDtoList.addAll(dtoList);
        });

    List<ClassDivisionResultDto> resultDataList =
        ClassDivisionUtil.convertProcessDtoToResultDto(resultDtoList);
    return ClassDivisionUtil.convertObjectListToJsonNode(resultDataList);
  }
}
