package com.example.classAppClassService.services.classClassification.process;

import com.example.classAppClassService.model.ClassDivisionExpectedInput;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.model.ClassGradeExpectedInput;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.collections4.CollectionUtils;
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

  private final ClassGradeExpectedInput classGradeExpectedInput;
  private int newGrade;

  public ClassDivisionDisciplineSwap(int newGrade, ClassGradeExpectedInput classGradeExpectedInput) {
    this.newGrade = newGrade;
    this.classGradeExpectedInput = classGradeExpectedInput;
  }

  @Override
  public void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    processNext(
        processGradeDisciplineSwap(classDivisionProcessDtoList, classGradeExpectedInput));
  }

  private List<ClassDivisionProcessDto> processGradeDisciplineSwap(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassGradeExpectedInput classGradeExpectedInput) {
    List<ClassDivisionProcessDto> resultDtoList = new ArrayList<>();
    resultDtoList.addAll(processClassDisciplineSwap(newGrade, classDivisionProcessDtoList, classGradeExpectedInput));
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
            .collect(Collectors.toList());
    if (CollectionUtils.isEmpty(disciplineDList)) {
      return classDivisionProcessDtoList;
    }
    log.info("new Grade:{}, classDivisionProcessDtoList size:{}," +
                    " disciplineDList size:{}," +
                    " expectedNumberOfClass:{}",
            newGrade,
            classDivisionProcessDtoList.size(),
            disciplineDList.size(),
            classGradeExpectedInput.getNumberOfClass()

    );
    sortedByGradeRank(disciplineDList);
    List<ClassDivisionProcessDto> unsortedList = new ArrayList<>();
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
                      classDivisionProcessDtoList, downDto, classGradeExpectedInput, dto)
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
                      classDivisionProcessDtoList, upDto, classGradeExpectedInput, dto)
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

    log.info("discipline list: ");
    classDivisionProcessDtoList.stream()
            .collect(Collectors.groupingBy(ClassDivisionProcessDto::getNewClassName)).forEach(
            (key3, value3) -> {
              log.info(
                      "Class:"
                              + key3
                              + ", total male"
                              + value3.stream()
                              .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
                              .toList()
                              .size()
                              + " total female:"
                              + value3.stream()
                              .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
                              .toList()
                              .size());
              log.info(
                      "Class:"
                              + key3
                              + ", total Discipline D: "
                              + value3.stream()
                              .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentDisciple(), "D"))
                              .toList()
                              .size());
            }
            );
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
      ClassGradeExpectedInput classGradeExpectedInput,
  ClassDivisionProcessDto currentDto) {

    //AtomicBoolean result = new AtomicBoolean(false);
    AtomicBoolean processCheckDto = new AtomicBoolean(false);
    AtomicBoolean processCurrentDto = new AtomicBoolean(false);

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
                  <= expectedPerClass) {
            processCheckDto.set(true);
          }
        });

    sortedClassNameListProcessDtoMap.forEach(
            (key, value) -> {
              if (StringUtils.equalsIgnoreCase(currentDto.getNewClassName(), key)
                      && value.stream()
                      .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentDisciple(), "D"))
                      .toList()
                      .size()
                      >= expectedPerClass) {
                processCurrentDto.set(true);
              }
            });

    return processCurrentDto.get() && processCheckDto.get();
  }
}
