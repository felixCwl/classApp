package com.example.classAppClassService.services.classClassification;

import com.example.classAppClassService.entity.ClassDivisionExcel;
import com.example.classAppClassService.model.ClassDivisionProcessDto;
import com.example.classAppClassService.model.ClassDivisionResultDto;
import com.example.classAppClassService.model.ClassGradeExpectedInput;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.formula.functions.T;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Log4j2
public class ClassDivisionUtil {
  public static List<ClassDivisionExcel> convertJsonNodeToClassExcelList(JsonNode excelJsonNode) {
    ObjectMapper objectMapper = new ObjectMapper();
    List<ClassDivisionExcel> classDivisionExcelList = new ArrayList<>();
    for (JsonNode jsonNode : excelJsonNode.get(excelJsonNode.fieldNames().next())) {
      ClassDivisionExcel classDivisionExcel = null;
      try {
        classDivisionExcel = objectMapper.treeToValue(jsonNode, ClassDivisionExcel.class);
      } catch (JsonProcessingException e) {
        throw new RuntimeException(e);
      }
      classDivisionExcelList.add(classDivisionExcel);
    }
    return classDivisionExcelList;
  }

  public static List<ClassDivisionProcessDto> convertExcelDtoToProcessDto(
      List<ClassDivisionExcel> classDivisionExcels) {
    List<ClassDivisionProcessDto> processDtoList = new ArrayList<>();
    classDivisionExcels.forEach(
        classDivisionExcel -> {
          ClassDivisionProcessDto classDivisionProcessDto = new ClassDivisionProcessDto();
          classDivisionProcessDto.setOriginalGrade(
              convertOriginalClassNameToGrade(classDivisionExcel.getClassName()));
          classDivisionProcessDto.setClassNumber(classDivisionExcel.getClassNumber());
          classDivisionProcessDto.setOriginalClassName(classDivisionExcel.getClassName());
          classDivisionProcessDto.setStudentChineseName(classDivisionExcel.getStudentChineseName());
          classDivisionProcessDto.setStudentEnglishName(classDivisionExcel.getStudentEnglishName());
          classDivisionProcessDto.setStudentDisciple(classDivisionExcel.getDiscipline());
          classDivisionProcessDto.setStudentClassRank(classDivisionExcel.getStudentClassRank());
          classDivisionProcessDto.setStudentGradeRank(classDivisionExcel.getStudentGradeRank());
          classDivisionProcessDto.setStudentGender(classDivisionExcel.getStudentGender());
          classDivisionProcessDto.setRemark(classDivisionExcel.getRemark());
          processDtoList.add(classDivisionProcessDto);
        });
    return processDtoList;
  }

  public static Integer convertOriginalClassNameToGrade(String className) {
    if (StringUtils.isNotBlank(className)) {
      if (StringUtils.equals(StringUtils.upperCase(className.substring(0, 1)), "K")) {
        return 0;
      }
      return Integer.parseInt(className.substring(0, 1));
    }
    return 0;
  }

  public static <T> JsonNode convertObjectListToJsonNode(List<T> list) {
    ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.valueToTree(list);
  }

  public static List<ClassDivisionResultDto> convertProcessDtoToResultDto(
      List<ClassDivisionProcessDto> processDtoList) {
    List<ClassDivisionResultDto> resultDtoList = new ArrayList<>();
    processDtoList.forEach(
        e -> {
          ClassDivisionResultDto resultDto = new ClassDivisionResultDto();
          resultDto.setClassName(e.getOriginalClassName());
          resultDto.setClassNumber(String.valueOf(e.getClassNumber()));
          resultDto.setStudentEnglishName(e.getStudentEnglishName());
          resultDto.setStudentChineseName(e.getStudentChineseName());
          resultDto.setStudentGender(e.getStudentGender());
          resultDto.setStudentDisciple(e.getStudentDisciple());
          resultDto.setStudentClassRank(
              e.getStudentClassRank() == 9999 ? "" : String.valueOf(e.getStudentClassRank()));
          resultDto.setStudentGradeRank(
              e.getStudentGradeRank() == 9999 ? "" : String.valueOf(e.getStudentGradeRank()));
          resultDto.setRemark(e.getRemark());
          resultDto.setNewClassName(e.getNewGrade() + e.getNewClassName());
          resultDtoList.add(resultDto);
        });
    return resultDtoList;
  }

    public static List<String> generateOrderedNewClassList(int numberOfExpectedClass, String firstClassName) {
        if (numberOfExpectedClass <= 0 || numberOfExpectedClass > 26) {
            log.error("Length must be between 1 and 26");
            return List.of("A");
        }

        var letterList = IntStream.range(0, numberOfExpectedClass)
                .mapToObj(i -> String.valueOf((char) ('A' + i)))
                .toList();

        if (!letterList.contains(firstClassName)) {
            log.error("Input letter not match with length");
            return letterList;
        }

        int startIndex = letterList.indexOf(firstClassName);
        return Stream.concat(
                letterList.subList(startIndex, letterList.size()).stream(),
                letterList.subList(0, startIndex).stream()
        ).toList();
    }

  public static List<String> generateOrderedNewClassList1(
      int numberOfExpectedClass, String firstClassName) {
      if (numberOfExpectedClass <= 0 || numberOfExpectedClass > 26 ) {
          log.error("Length must be between 1 and 26");
          return Arrays.asList("A");
      }
      char v = firstClassName.charAt(0);

      List<String> letterList = new ArrayList<>();
      for (char c = 'A'; c < 'A' + numberOfExpectedClass; c++) {
          letterList.add(String.valueOf(c));
      }
      if (!letterList.contains(firstClassName)) {
          log.error("Input letter not match with length");
          return letterList;
      }
      int startIndex = letterList.indexOf(firstClassName);

      if (startIndex == -1) {
          log.error("Input letter not found in the alphabet list");
          return letterList;
      }
      List<String> result = new ArrayList<>();
      for (int i = startIndex; i < letterList.size(); i++) {
          result.add(letterList.get(i));
      }

      for (int i = 0; i < startIndex; i++) {
          result.add(letterList.get(i));
      }

      return result;
  }

  private static List<String> sortNewClassList(List<String> newClassList) {
    String headerLetter = newClassList.get(0);
    Collections.sort(newClassList.subList(1, newClassList.size()));
    newClassList.remove(headerLetter);
    newClassList.add(0, headerLetter);
    return newClassList;
  }

  public static void sortedByNewGradeAndGradeRank(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    Comparator<ClassDivisionProcessDto> comparator =
        Comparator.comparing(ClassDivisionProcessDto::getNewGrade);
    comparator = comparator.thenComparing(ClassDivisionProcessDto::getStudentGradeRank);
    classDivisionProcessDtoList.sort(comparator);
  }

  public static void sortedByGradeRank(List<ClassDivisionProcessDto> classDivisionProcessDtoList) {
    Comparator<ClassDivisionProcessDto> comparator =
        Comparator.comparing(ClassDivisionProcessDto::getStudentGradeRank);
    classDivisionProcessDtoList.sort(comparator);
  }

  public static Map<String, List<ClassDivisionProcessDto>> getSortedClassNameProcessDtoMap(
      List<ClassDivisionProcessDto> classDivisionProcessDtoList,
      ClassGradeExpectedInput classGradeExpectedInput) {
    Map<String, List<ClassDivisionProcessDto>> classNameListProcessDtoMap =
        classDivisionProcessDtoList.stream()
            .collect(Collectors.groupingBy(ClassDivisionProcessDto::getNewClassName));
    List<String> orderedNewClassList =
        ClassDivisionUtil.generateOrderedNewClassList(
            classGradeExpectedInput.getNumberOfClass(),
            classGradeExpectedInput.getFirstClassName());

    Map<String, List<ClassDivisionProcessDto>> sortedClassNameListProcessDtoMap =
        new LinkedHashMap<>();

    orderedNewClassList.stream()
        .filter(classNameListProcessDtoMap::containsKey)
        .forEachOrdered(
            key -> sortedClassNameListProcessDtoMap.put(key, classNameListProcessDtoMap.get(key)));
    return sortedClassNameListProcessDtoMap;
  }
}
