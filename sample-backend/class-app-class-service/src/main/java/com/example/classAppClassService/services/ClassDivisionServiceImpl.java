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
import org.apache.commons.lang.StringUtils;
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

      assignNewGrade(classDivisionProcessDtoList);

    Map<Integer, List<ClassDivisionProcessDto>> gradeGroupProcessDtoMap =
        classDivisionProcessDtoList.stream()
            .collect(Collectors.groupingBy(ClassDivisionProcessDto::getNewGrade));

    List<ClassDivisionProcessDto> resultDtoList = new ArrayList<>();

    gradeGroupProcessDtoMap.forEach(
        (grade, dtoList) -> {
          ClassDivisionProcessor classDivisionProcessor =
              ClassDivisionProcessor.link(
                  new ClassDivisionPreHandleData(),
                  new ClassDivisionSorting(grade, classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(grade)),
                  new ClassDivisionGenderSwap(grade, classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(grade))
                      ,
                  new ClassDivisionDisciplineSwap(grade, classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(grade)),
                  new ClassDivisionRetainSwap(grade,classDivisionDto.getClassDivisionExpectedInput().getClassGradeExpectedInputMap().get(grade))
              );
          classDivisionProcessor.processData(dtoList);
          resultDtoList.addAll(dtoList);
        });

    List<ClassDivisionResultDto> resultDataList =
        ClassDivisionUtil.convertProcessDtoToResultDto(resultDtoList);
    return ClassDivisionUtil.convertObjectListToJsonNode(resultDataList);
  }

    private void assignNewGrade(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
        classDivisionProcessDtoList.forEach(
                classDivisionProcessDto -> {
                    String studentRemark = StringUtils.lowerCase(classDivisionProcessDto.getRemark());
                    String promotionPrefix = StringUtils.lowerCase("promoted");
                    int newGrade =
                            StringUtils.equals(studentRemark, promotionPrefix)
                                    ? classDivisionProcessDto.getOriginalGrade() + 1
                                    : classDivisionProcessDto.getOriginalGrade();
                    classDivisionProcessDto.setNewGrade(newGrade);
                });
    }

}
