package com.example.classAppClassService.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ClassDivisionExcel {
    @JsonProperty("CLASS")
    private String className;
    @JsonProperty("CLASS NO")
    private int classNumber;
    @JsonProperty("eng_name")
    private String studentEnglishName;
    @JsonProperty("chi_name")
    private String studentChineseName;
    @JsonProperty("sex")
    private String studentGender;
    @JsonProperty("2_discip")
    private String discipline;
    @JsonProperty("3_rank_class")
    private int studentClassRank;
    @JsonProperty("3_rank_all")
    private int studentGradeRank;
    @JsonProperty("Remarks")
    private String remark;
}


