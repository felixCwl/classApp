package com.example.classAppClassService.model;

import lombok.Data;

import java.io.Serializable;

@Data
    public class ClassGradeExpectedInput implements Serializable {
    //private int grade;
    private int numberOfClass;
    private String firstClassName;
    private int immutableGradeRank;
}
