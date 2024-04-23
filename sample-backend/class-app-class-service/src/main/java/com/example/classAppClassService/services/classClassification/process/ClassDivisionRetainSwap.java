package com.example.classAppClassService.services.classClassification.process;

import com.example.classAppClassService.model.ClassDivisionExpectedInput;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.model.ClassGradeExpectedInput;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.example.classAppClassService.services.classClassification.ClassDivisionUtil.sortedByGradeRank;

@Log4j2
public class ClassDivisionRetainSwap extends ClassDivisionProcessor {

  private final ClassDivisionExpectedInput classDivisionExpectedInput;

  public ClassDivisionRetainSwap(ClassDivisionExpectedInput classDivisionExpectedInput) {
    this.classDivisionExpectedInput = classDivisionExpectedInput;
  }

  @Override
  public void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    processNext(processGradeRetainSwap(classDivisionProcessDtoList));
  }

  private List<ClassDivisionProcessDto> processGradeRetainSwap(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    List<ClassDivisionProcessDto> resultDtoList = new ArrayList<>();
    classDivisionExpectedInput
        .getClassGradeExpectedInputMap()
        .forEach(
            (key, value) -> {
              List<ClassDivisionProcessDto> gradeProcessDtoList =
                  classDivisionProcessDtoList.stream()
                      .filter(e -> e.getNewGrade() == key)
                      .collect(Collectors.toList());
              resultDtoList.addAll(processClassRetainSwap(key, gradeProcessDtoList, value));
            });
    return resultDtoList;
  }

  private List<ClassDivisionProcessDto> processClassRetainSwap(
      Integer newGrade,
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassGradeExpectedInput classGradeExpectedInput) {
    sortedByGradeRank(classDivisionProcessDtoList);
    List<ClassDivisionProcessDto> retainProcessDtoList =
        classDivisionProcessDtoList.stream()
            .filter(e -> !StringUtils.equalsIgnoreCase(e.getRemark(), "promoted"))
            .toList();
    log.info("new Grade:{}, classDivisionProcessDtoList size:{}," +
                    " retainProcessDtoList size:{}," +
                    " expectedNumberOfClass:{}",
            newGrade,
            classDivisionProcessDtoList.size(),
            retainProcessDtoList.size(),
            classGradeExpectedInput.getNumberOfClass()
    );

    retainProcessDtoList.forEach(
        dto -> {
          boolean doFlag = true;
          int counter = 0;
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
                && !StringUtils.equalsIgnoreCase(downDto.getNewClassName(), dto.getNewClassName())
                && downDto.getStudentGradeRank()
                    > classGradeExpectedInput.getImmutableGradeRank()) {
              log.info("new Grade:{},before retained swap, process dto:{}, checked downDto:{} with counter {}", newGrade, dto, downDto, counter);
              String originalNewDisciplineClass = dto.getNewClassName();
              String originalNewCheckedClass = downDto.getNewClassName();
              classDivisionProcessDtoList.remove(dto);
              classDivisionProcessDtoList.remove(downDto);
              downDto.setNewClassName(originalNewDisciplineClass);
              dto.setNewClassName(originalNewCheckedClass);
              classDivisionProcessDtoList.add(downDto);
              classDivisionProcessDtoList.add(dto);
              log.info("new Grade:{},after retained swap, process dto:{}, checked downDto:{} with counter {}", newGrade, dto, downDto, counter);
              doFlag = false;
            }

            if (Objects.nonNull(upDto)
                && !StringUtils.equalsIgnoreCase(upDto.getNewClassName(), dto.getNewClassName())
                && upDto.getStudentGradeRank() > classGradeExpectedInput.getImmutableGradeRank()) {
              log.info("new Grade:{},before retained swap, process dto:{}, checked upDto:{} with counter {}", newGrade, dto, upDto, counter);
              String originalNewRetainClass = dto.getNewClassName();
              String originalNewCheckedClass = upDto.getNewClassName();
              classDivisionProcessDtoList.remove(dto);
              classDivisionProcessDtoList.remove(upDto);
              upDto.setNewClassName(originalNewRetainClass);
              dto.setNewClassName(originalNewCheckedClass);
              classDivisionProcessDtoList.add(upDto);
              classDivisionProcessDtoList.add(dto);
              doFlag = false;
              log.info("new Grade:{},after retained swap, process dto:{}, checked upDto:{} with counter {}", newGrade, dto, upDto, counter);
            }
            if (Objects.isNull(downDto) && Objects.isNull(upDto)) {
              doFlag = false;
            }
          }
        });
    return classDivisionProcessDtoList;
  }
}
