package com.example.classAppClassService.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class ClassDivisionResultDto implements Serializable {
  private String className;
  private String classNumber;
  private String studentEnglishName;
  private String studentChineseName;
  private String studentGender;
  private String studentDisciple;
  private String studentClassRank;
  private String studentGradeRank;
  private String newClassName;
  private String remark;
}
