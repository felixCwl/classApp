package com.example.classAppClassService.services.classClassification.process;

import com.example.classAppClassService.model.ClassDivisionExpectedInput;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.model.ClassGradeExpectedInput;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.classAppClassService.services.classClassification.ClassDivisionUtil.getSortedClassNameProcessDtoMap;

@Log4j2
public class ClassDivisionGenderSwap extends ClassDivisionProcessor {
  private final ClassGradeExpectedInput classGradeExpectedInput;
  private int newGrade;

  public ClassDivisionGenderSwap(int newGrade, ClassGradeExpectedInput classGradeExpectedInput) {
      this.newGrade = newGrade;
      this.classGradeExpectedInput = classGradeExpectedInput;
  }

  @Override
  public void processData(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    processNext(processGradeGenderSwap(classDivisionProcessDtoList, classGradeExpectedInput));
  }

  private List<ClassDivisionProcessDto> processGradeGenderSwap(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassGradeExpectedInput classGradeExpectedInput) {
    List<ClassDivisionProcessDto> resultDtoList = new ArrayList<>();
    resultDtoList.addAll(processClassGenderSwap(newGrade, classDivisionProcessDtoList, classGradeExpectedInput));
    return resultDtoList;
  }

  private List<ClassDivisionProcessDto> processClassGenderSwap(
          Integer newGrade,
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassGradeExpectedInput classGradeExpectedInput) {
    List<ClassDivisionProcessDto> genderSwapPool = new ArrayList<>();
    double totalFemaleCount =
        classDivisionProcessDtoList.stream()
            .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
            .toList()
            .size();
    double totalMaleCount =
        classDivisionProcessDtoList.stream()
            .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
            .toList()
            .size();
    int expectedNumberOfMalePerClass =
        getExpectedNumberOfMalePerClass(
            totalMaleCount, totalFemaleCount, classGradeExpectedInput.getNumberOfClass());
    int expectedNumberOfFemalePerClass =
        getExpectedNumberOfFemalePerClass(
            totalFemaleCount, totalFemaleCount, classGradeExpectedInput.getNumberOfClass());

    Map<String, List<ClassDivisionProcessDto>> sortedClassNameListProcessDtoMap =
        getSortedClassNameProcessDtoMap(classDivisionProcessDtoList, classGradeExpectedInput);

    log.info("new Grade:{}, classDivisionProcessDtoList size:{}," +
                    " expectedNumberOfMalePerClass:{}," +
                    " expectedNumberOfFemalePerClass: {}",
            newGrade,
            classDivisionProcessDtoList.size(),
            expectedNumberOfMalePerClass,
            expectedNumberOfFemalePerClass
    );

    sortedClassNameListProcessDtoMap.forEach(
        (key, value) -> {
            log.info("sortedClassNameListProcessDtoMap before add to genderSwapPool, key:{}, value:{}", key, value.size() );
          List<ClassDivisionProcessDto> malePerClassProcessDtoList =
              value.stream()
                  .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
                  .collect(Collectors.toList());
          List<ClassDivisionProcessDto> femalePerClassProcessDtoList =
              value.stream()
                  .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
                  .collect(Collectors.toList());

          while (malePerClassProcessDtoList.size() > expectedNumberOfMalePerClass) {
            ClassDivisionProcessDto currentDto =
                malePerClassProcessDtoList.get(Math.floorDiv(expectedNumberOfMalePerClass, 2));
              while (currentDto.getStudentGradeRank()
                      < classGradeExpectedInput.getImmutableGradeRank()
                  && malePerClassProcessDtoList.getLast() != currentDto) {
                currentDto =
                    malePerClassProcessDtoList.get(
                        malePerClassProcessDtoList.indexOf(currentDto) + 1);
                if (currentDto.equals(malePerClassProcessDtoList.getLast())){
                    break;
                }
            }
            genderSwapPool.add(currentDto);
            malePerClassProcessDtoList.remove(currentDto);
            value.remove(currentDto);
          }
          while (femalePerClassProcessDtoList.size() > expectedNumberOfFemalePerClass) {
            ClassDivisionProcessDto currentDto =
                femalePerClassProcessDtoList.get(Math.floorDiv(expectedNumberOfFemalePerClass, 2));
              while (currentDto.getStudentGradeRank()
                      < classGradeExpectedInput.getImmutableGradeRank()
                  && femalePerClassProcessDtoList.getLast() != currentDto) {
                currentDto =
                    femalePerClassProcessDtoList.get(
                        femalePerClassProcessDtoList.indexOf(currentDto) + 1);
                  if (currentDto.equals(femalePerClassProcessDtoList.getLast())){
                      break;
                  }
              }
            genderSwapPool.add(currentDto);
            femalePerClassProcessDtoList.remove(currentDto);
            value.remove(currentDto);
          }
            log.info("sortedClassNameListProcessDtoMap after add to genderSwapPool, key:{}, value:{}", key, value.size() );
        });
    log.info("new grade:{}, start swapping with genderSwapPool:{}",newGrade, genderSwapPool);
    log.info("sortedClassNameListProcessDtoMap: ");
    sortedClassNameListProcessDtoMap.forEach(
        (key3, value3) ->
            log.info(
                "Class:"
                    + key3
                    + ", total male"
                    + value3.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
                        .toList()
                        .size()
                    + "total female:"
                    + value3.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
                        .toList()
                        .size()));
    Comparator<ClassDivisionProcessDto> gradeComparator =
        Comparator.comparing(ClassDivisionProcessDto::getStudentGradeRank);
    genderSwapPool.sort(gradeComparator);
    List<ClassDivisionProcessDto> maleGenderSwapPool =
        genderSwapPool.stream()
            .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
            .collect(Collectors.toList());
    List<ClassDivisionProcessDto> femaleGenderSwapPool =
        genderSwapPool.stream()
            .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
            .collect(Collectors.toList());

    while (maleGenderSwapPool.size() > 0) {
      int poolSize = maleGenderSwapPool.size();
      sortedClassNameListProcessDtoMap.forEach(
          (key1, value1) -> {
            if (maleGenderSwapPool.size() == 0) {
              return;
            }
            ClassDivisionProcessDto current = maleGenderSwapPool.get(0);
            if (value1.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
                        .toList()
                        .size()
                    < expectedNumberOfMalePerClass
                && StringUtils.equalsIgnoreCase(current.getStudentGender(), "M")) {
              value1.add(current);
              maleGenderSwapPool.remove(current);
              genderSwapPool.remove(current);
            }
          });
      if (poolSize == maleGenderSwapPool.size()) {
        break;
      }
    }

    while (femaleGenderSwapPool.size() > 0) {
      if (femaleGenderSwapPool.size() == 0) {
        break;
      }
      int poolSize = femaleGenderSwapPool.size();
      sortedClassNameListProcessDtoMap.forEach(
          (key1, value1) -> {
            if (femaleGenderSwapPool.size() > 0) {
              return;
            }
            ClassDivisionProcessDto current = femaleGenderSwapPool.get(0);
            if (value1.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
                        .toList()
                        .size()
                    < expectedNumberOfFemalePerClass
                && StringUtils.equalsIgnoreCase(current.getStudentGender(), "F")) {
              value1.add(current);
              femaleGenderSwapPool.remove(current);
              genderSwapPool.remove(current);
            }
          });
      if (poolSize == femaleGenderSwapPool.size()) {
        break;
      }
    }
    log.info("sortedClassNameListProcessDtoMap: ");
    sortedClassNameListProcessDtoMap.forEach(
        (key3, value3) ->
            log.info(
                "Class:"
                    + key3
                    + ", total male"
                    + value3.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
                        .toList()
                        .size()
                    + "total female:"
                    + value3.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
                        .toList()
                        .size()));
    while (genderSwapPool.size() > 0) {
      sortedClassNameListProcessDtoMap.forEach(
          (key2, value2) -> {
            if (genderSwapPool.size() > 0) {
              ClassDivisionProcessDto current = genderSwapPool.getFirst();
              value2.add(current);
              genderSwapPool.remove(current);
            }
          });
    }
    log.info("sortedClassNameListProcessDtoMap: ");
    sortedClassNameListProcessDtoMap.forEach(
        (key3, value3) ->
            log.info(
                "Class:"
                    + key3
                    + ", total male"
                    + value3.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "M"))
                        .toList()
                        .size()
                    + "total female:"
                    + value3.stream()
                        .filter(e -> StringUtils.equalsIgnoreCase(e.getStudentGender(), "F"))
                        .toList()
                        .size()));
    sortedClassNameListProcessDtoMap.forEach((k, v) -> v.forEach(e -> e.setNewClassName(k)));
    return sortedClassNameListProcessDtoMap.values().stream()
        .flatMap(List::stream)
        .collect(Collectors.toList());
  }

  private int getExpectedNumberOfMalePerClass(
      double totalMale, double totalFemale, double numberOfClass) {
    return (int)
        Math.floor(
            (totalMale / (totalFemale + totalMale)) * (totalMale + totalFemale) / numberOfClass);
  }

  private int getExpectedNumberOfFemalePerClass(
      double totalMale, double totalFemale, double numberOfClass) {
    return (int)
        Math.floor(
            (totalFemale / (totalFemale + totalMale)) * (totalMale + totalFemale) / numberOfClass);
  }
}
