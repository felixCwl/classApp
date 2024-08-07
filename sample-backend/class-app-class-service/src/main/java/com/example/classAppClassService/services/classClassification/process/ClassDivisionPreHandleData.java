package com.example.classAppClassService.services.classClassification.process;

import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.services.classClassification.ClassDivisionUtil;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.logging.log4j.Level;

import java.util.List;

@Log4j2
public class ClassDivisionPreHandleData extends ClassDivisionProcessor {
  private ClassDivisionProcessDto classDivisionProcessDto;

  public ClassDivisionPreHandleData() {}

  private void getLogger(String methodName, String msg, Level level) {
    if (level.name().equals(Level.INFO.name())) {
      log.info(
          String.format(
              "%s.%s(), %s", ClassDivisionPreHandleData.class.getName(), methodName, msg));
    } else {
      log.debug(
          String.format(
              "%s.%s(), %s", ClassDivisionPreHandleData.class.getName(), methodName, msg));
    }
  }

  @Override
  public void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    getLogger(
        "processData",
        String.format(
            "before process data, classDivisionProcessDtoList: %s", classDivisionProcessDtoList),
        Level.INFO);
    removeEmptyData(classDivisionProcessDtoList);
    preHandleKinderGardenStudent(classDivisionProcessDtoList);
    getLogger(
        "processData",
        String.format(
            "after process preHandleKinderGardenStudent, classDivisionProcessDtoList: %s",
            classDivisionProcessDtoList),
        Level.DEBUG);

    assignOriginalGrade(classDivisionProcessDtoList);
    getLogger(
        "processData",
        String.format(
            "after process assignOriginalGrade, classDivisionProcessDtoList: %s",
            classDivisionProcessDtoList),
        Level.DEBUG);

    preHandleRetained(classDivisionProcessDtoList);
    ClassDivisionUtil.sortedByNewGradeAndGradeRank(classDivisionProcessDtoList);
    getLogger(
        "processData",
        String.format(
            "after process assignNewGrade, classDivisionProcessDtoList: %s",
            classDivisionProcessDtoList),
        Level.DEBUG);

    getLogger(
        "processData",
        String.format(
            "after process data, classDivisionProcessDtoList: %s", classDivisionProcessDtoList),
        Level.INFO);
    processNext(classDivisionProcessDtoList);
  }

    private void removeEmptyData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
      //remove empty data when excel passing empty row
      classDivisionProcessDtoList.removeIf(e->{
          return StringUtils.isBlank(e.getStudentEnglishName())
                  && StringUtils.isBlank(e.getStudentChineseName())
                  && StringUtils.isBlank(e.getOriginalClassName())
                  && e.getStudentGradeRank() == 0
                  && e.getOriginalGrade() == 0
                  && e.getNewGrade() == 0
                  && e.getClassNumber() == 0
                  && e.getStudentGradeRank() == 0
                  && e.getStudentClassRank() == 0
                  ;
      });
    }

    private void preHandleKinderGardenStudent(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    classDivisionProcessDtoList.forEach(
        classDivisionProcessDto -> {
          String kinderGardenStudentGradePrefix = StringUtils.lowerCase("K.3");
          int kinderGardenStudentOriginalGrade = 0;
          if (StringUtils.lowerCase(classDivisionProcessDto.getOriginalClassName())
              .contains(kinderGardenStudentGradePrefix)) {
            classDivisionProcessDto.setOriginalGrade(kinderGardenStudentOriginalGrade);
            classDivisionProcessDto.setOriginalClassName(org.apache.commons.lang3.StringUtils.replaceIgnoreCase(classDivisionProcessDto.getOriginalClassName(), "K.3", "0"));
          }
        });
  }

  private void assignOriginalGrade(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    classDivisionProcessDtoList.forEach(
        classDivisionProcessDto -> {
          int grade =
              NumberUtils.toInt(classDivisionProcessDto.getOriginalClassName().substring(0, 1), 0);
          classDivisionProcessDto.setOriginalGrade(grade);
        });
  }

  private void preHandleRetained(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
      classDivisionProcessDtoList.stream().filter(e -> !StringUtils.equalsIgnoreCase(e.getRemark(), "promoted")).forEach(
              classDivisionProcessDto -> {
                  classDivisionProcessDto.setNewClassName(classDivisionProcessDto.getOriginalClassName().substring(classDivisionProcessDto.getOriginalClassName().length() - 1));
              });
  }

}
