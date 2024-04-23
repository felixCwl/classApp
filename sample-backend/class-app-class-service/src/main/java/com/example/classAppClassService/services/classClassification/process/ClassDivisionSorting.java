package com.example.classAppClassService.services.classClassification.process;

import com.example.classAppClassService.model.ClassDivisionExpectedInput;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.services.classClassification.ClassDivisionUtil;
import org.apache.commons.collections4.ListUtils;
import org.apache.commons.collections4.MapUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class ClassDivisionSorting extends ClassDivisionProcessor {
  private ClassDivisionExpectedInput classDivisionExpectedInput;

  public ClassDivisionSorting(ClassDivisionExpectedInput classDivisionExpectedInput) {
    this.classDivisionExpectedInput = classDivisionExpectedInput;
  }

  @Override
  public void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    if (Objects.isNull(this.classDivisionExpectedInput)
        || MapUtils.isEmpty(this.classDivisionExpectedInput.getClassGradeExpectedInputMap())) {
      return;
    }
    processNext(snakeSortingAllGrade(classDivisionProcessDtoList, this.classDivisionExpectedInput));
  }

  protected List<ClassDivisionProcessDto> snakeSortingAllGrade(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassDivisionExpectedInput classDivisionExpectedInput) {
    List<ClassDivisionProcessDto> resultProcessDtoList = new ArrayList<>();
    classDivisionExpectedInput
        .getClassGradeExpectedInputMap()
        .forEach(
            (key, value) -> {
              List<ClassDivisionProcessDto> gradeProcessDtoList =
                  classDivisionProcessDtoList.stream()
                      .filter(e -> e.getNewGrade() == key)
                      .collect(Collectors.toList());
              snakeSorting(
                  gradeProcessDtoList, value.getNumberOfClass(), value.getFirstClassName());
              resultProcessDtoList.addAll(gradeProcessDtoList);
            });
    return resultProcessDtoList;
  }

  protected void snakeSorting(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      int numberOfExpectedClass,
      String firstClassName) {
    List<String> newClassOrderedList =
        ClassDivisionUtil.generateOrderedNewClassList(numberOfExpectedClass, firstClassName);
    List<List<ClassDivisionProcessDto>> chunkedList =
        ListUtils.partition(classDivisionProcessDtoList, numberOfExpectedClass);
    chunkedList.forEach(
        chunk -> {
          int currentChunkIndex = chunkedList.indexOf(chunk);
          if (currentChunkIndex == 0 || currentChunkIndex % 2 != 0) {
            chunk.forEach(
                classDivisionProcessDto -> {
                  int currentDtoIndex = chunk.indexOf(classDivisionProcessDto);
                  classDivisionProcessDto.setNewClassName(newClassOrderedList.get(currentDtoIndex));
                });
          } else {
            chunk
                .reversed()
                .forEach(
                    classDivisionProcessDto -> {
                      int currentDtoIndex = chunk.reversed().indexOf(classDivisionProcessDto);
                      classDivisionProcessDto.setNewClassName(
                          newClassOrderedList.get(currentDtoIndex));
                    });
          }
        });
  }
}
