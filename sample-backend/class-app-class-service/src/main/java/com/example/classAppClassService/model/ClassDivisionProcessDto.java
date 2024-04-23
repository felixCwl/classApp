package com.example.classAppClassService.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class ClassDivisionProcessDto implements Serializable {
  private int originalGrade;
  private int newGrade;
  private int classNumber;
  private int studentClassRank;
  private int studentGradeRank;
  private String originalClassName;
  private String newClassName;
  private String studentEnglishName;
  private String studentChineseName;
  private String studentGender;
  private String studentDisciple;
  private String remark;
}
