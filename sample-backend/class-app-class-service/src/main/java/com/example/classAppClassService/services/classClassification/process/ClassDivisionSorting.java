package com.example.classAppClassService.services.classClassification.process;

import com.example.classAppClassService.model.ClassDivisionExpectedInput;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.model.ClassGradeExpectedInput;
import com.example.classAppClassService.services.classClassification.ClassDivisionUtil;
import org.apache.commons.collections4.ListUtils;
import org.apache.commons.collections4.MapUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class ClassDivisionSorting extends ClassDivisionProcessor {
  private ClassGradeExpectedInput classGradeExpectedInput;
  private int newGrade;

  public ClassDivisionSorting(int newGrade, ClassGradeExpectedInput classGradeExpectedInput) {
      this.newGrade = newGrade;
    this.classGradeExpectedInput = classGradeExpectedInput;
  }

  @Override
  public void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    if (Objects.isNull(this.classGradeExpectedInput)) {
      return;
    }
    processNext(snakeSortingAllGrade(classDivisionProcessDtoList, this.classGradeExpectedInput));
  }

  protected List<ClassDivisionProcessDto> snakeSortingAllGrade(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassGradeExpectedInput classGradeExpectedInput) {
    List<ClassDivisionProcessDto> resultProcessDtoList = new ArrayList<>();
      snakeSorting(
              classDivisionProcessDtoList, classGradeExpectedInput.getNumberOfClass(), classGradeExpectedInput.getFirstClassName());
      resultProcessDtoList.addAll(classDivisionProcessDtoList);
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
