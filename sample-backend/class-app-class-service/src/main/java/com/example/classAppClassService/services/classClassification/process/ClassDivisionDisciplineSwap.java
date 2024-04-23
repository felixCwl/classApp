package com.example.classAppClassService.services.classClassification.process;

import com.example.classAppClassService.model.ClassDivisionExpectedInput;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.model.ClassGradeExpectedInput;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

import static com.example.classAppClassService.services.classClassification.ClassDivisionUtil.getSortedClassNameProcessDtoMap;
import static com.example.classAppClassService.services.classClassification.ClassDivisionUtil.sortedByGradeRank;

@Log4j2
public class ClassDivisionDisciplineSwap extends ClassDivisionProcessor {

  private final ClassDivisionExpectedInput classDivisionExpectedInput;

  public ClassDivisionDisciplineSwap(ClassDivisionExpectedInput classDivisionExpectedInput) {
    this.classDivisionExpectedInput = classDivisionExpectedInput;
  }

  @Override
  public void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    processNext(
        processGradeDisciplineSwap(classDivisionProcessDtoList, classDivisionExpectedInput));
  }

  private List<ClassDivisionProcessDto> processGradeDisciplineSwap(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassDivisionExpectedInput classDivisionExpectedInput) {
    List<ClassDivisionProcessDto> resultDtoList = new ArrayList<>();
    classDivisionExpectedInput
        .getClassGradeExpectedInputMap()
        .forEach(
            (key, value) -> {
              List<ClassDivisionProcessDto> gradeProcessDtoList =
                  classDivisionProcessDtoList.stream()
                      .filter(e -> e.getNewGrade() == key)
                      .collect(Collectors.toList());
              resultDtoList.addAll(processClassDisciplineSwap(key, gradeProcessDtoList, value));
            });
    return resultDtoList;
  }

  private List<ClassDivisionProcessDto> processClassDisciplineSwap(
      Integer newGrade,
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassGradeExpectedInput classGradeExpectedInput) {

    sortedByGradeRank(classDivisionProcessDtoList);
    List<ClassDivisionProcessDto> disciplineDList =
        classDivisionProcessDtoList.stream()
            .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentDisciple(), "D"))
            .toList();
    log.info("new Grade:{}, classDivisionProcessDtoList size:{}," +
                    " disciplineDList size:{}," +
                    " expectedNumberOfClass:{}",
            newGrade,
            classDivisionProcessDtoList.size(),
            disciplineDList.size(),
            classGradeExpectedInput.getNumberOfClass()
    );

    disciplineDList.forEach(
        dto -> {
          boolean doFlag = true;
          int counter = 0;
          if (checkIsRemovableClass(classDivisionProcessDtoList, dto, classGradeExpectedInput)) {
            while (doFlag) {
              counter++;
              ClassDivisionProcessDto downDto;
              ClassDivisionProcessDto upDto;
              if (classDivisionProcessDtoList.indexOf(dto) - counter >= 0) {
                downDto =
                    classDivisionProcessDtoList.get(
                        classDivisionProcessDtoList.indexOf(dto) - counter);
              } else {
                downDto = null;
              }

              if (classDivisionProcessDtoList.indexOf(dto) + counter
                  <= classDivisionProcessDtoList.size() - 1) {
                upDto =
                    classDivisionProcessDtoList.get(
                        classDivisionProcessDtoList.indexOf(dto) + counter);
              } else {
                upDto = null;
              }

              if (Objects.nonNull(downDto)
                  && checkIsAssignableClass(
                      classDivisionProcessDtoList, downDto, classGradeExpectedInput)
                  && StringUtils.equalsIgnoreCase(
                      dto.getStudentGender(), downDto.getStudentGender())
                  && !StringUtils.equalsIgnoreCase(dto.getNewClassName(), downDto.getNewClassName())
                  && !StringUtils.equalsIgnoreCase(downDto.getStudentDisciple(), "D")
                  && downDto.getStudentGradeRank()
                      > classGradeExpectedInput.getImmutableGradeRank()) {
                log.info("new Grade:{},before discipline swap," +
                        " process dto:{}, checked downDto:{} with counter {}",
                        newGrade,
                        dto,
                        downDto,
                        counter
                );
                String originalNewDisciplineClass = dto.getNewClassName();
                String originalNewCheckedClass = downDto.getNewClassName();
                classDivisionProcessDtoList.remove(dto);
                classDivisionProcessDtoList.remove(downDto);
                downDto.setNewClassName(originalNewDisciplineClass);
                dto.setNewClassName(originalNewCheckedClass);
                classDivisionProcessDtoList.add(downDto);
                classDivisionProcessDtoList.add(dto);
                doFlag = false;
                log.info("new Grade:{},after discipline swap," +
                        " process dto:{}, checked downDto:{} with counter {}",
                        newGrade,
                        dto,
                        downDto,
                        counter
                );

              }

              if (Objects.nonNull(upDto)
                  && checkIsAssignableClass(
                      classDivisionProcessDtoList, upDto, classGradeExpectedInput)
                  && StringUtils.equalsIgnoreCase(dto.getStudentGender(), upDto.getStudentGender())
                  && !StringUtils.equalsIgnoreCase(dto.getNewClassName(), upDto.getNewClassName())
                  && !StringUtils.equalsIgnoreCase(upDto.getStudentDisciple(), "D")
                  && upDto.getStudentGradeRank()
                      > classGradeExpectedInput.getImmutableGradeRank()) {
                log.info("new Grade:{},before discipline swap, process dto:{}," +
                        " checked upDto:{} with counter {}",
                        newGrade,
                        dto,
                        upDto,
                        counter
                );
                String originalNewDisciplineClass = dto.getNewClassName();
                String originalNewCheckedClass = upDto.getNewClassName();
                classDivisionProcessDtoList.remove(dto);
                classDivisionProcessDtoList.remove(upDto);
                upDto.setNewClassName(originalNewDisciplineClass);
                dto.setNewClassName(originalNewCheckedClass);
                classDivisionProcessDtoList.add(upDto);
                classDivisionProcessDtoList.add(dto);
                doFlag = false;
                log.info("new Grade:{},after discipline swap, process dto:{}," +
                                " checked upDto:{} with counter {}",
                        newGrade,
                        dto,
                        upDto,
                        counter
                );

              }

              if (Objects.isNull(downDto) && Objects.isNull(upDto)) {
                doFlag = false;
              }
            }
          }
        });
    return classDivisionProcessDtoList;
  }

  private int getExpectedNumberOfDisciplineDPerClass(
      int totalDisciplineCount, int numberOfNewClass) {
    return Math.floorDiv(totalDisciplineCount, numberOfNewClass);
  }

  private boolean checkIsRemovableClass(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassDivisionProcessDto checkDto,
      ClassGradeExpectedInput classGradeExpectedInput) {
    AtomicBoolean result = new AtomicBoolean(false);
    List<ClassDivisionProcessDto> disciplineDList =
        classDivisionProcessDtoList.stream()
            .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentDisciple(), "D"))
            .toList();
    int expectedPerClass =
        getExpectedNumberOfDisciplineDPerClass(
            disciplineDList.size(), classGradeExpectedInput.getNumberOfClass());
    Map<String, List<ClassDivisionProcessDto>> sortedClassNameListProcessDtoMap =
        getSortedClassNameProcessDtoMap(classDivisionProcessDtoList, classGradeExpectedInput);

    sortedClassNameListProcessDtoMap.forEach(
        (key, value) -> {
          if (StringUtils.equalsIgnoreCase(checkDto.getNewClassName(), key)
              && value.stream()
                      .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentDisciple(), "D"))
                      .toList()
                      .size()
                  > expectedPerClass) {
            result.set(true);
          }
        });
    return result.get();
  }

  private boolean checkIsAssignableClass(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassDivisionProcessDto checkDto,
      ClassGradeExpectedInput classGradeExpectedInput) {

    AtomicBoolean result = new AtomicBoolean(false);
    List<ClassDivisionProcessDto> disciplineDList =
        classDivisionProcessDtoList.stream()
            .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentDisciple(), "D"))
            .toList();
    int expectedPerClass =
        getExpectedNumberOfDisciplineDPerClass(
            disciplineDList.size(), classGradeExpectedInput.getNumberOfClass());
    Map<String, List<ClassDivisionProcessDto>> sortedClassNameListProcessDtoMap =
        getSortedClassNameProcessDtoMap(classDivisionProcessDtoList, classGradeExpectedInput);

    sortedClassNameListProcessDtoMap.forEach(
        (key, value) -> {
          if (StringUtils.equalsIgnoreCase(checkDto.getNewClassName(), key)
              && value.stream()
                      .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentDisciple(), "D"))
                      .toList()
                      .size()
                  < expectedPerClass) {
            result.set(true);
          }
        });
    return result.get();
  }
}
