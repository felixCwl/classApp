package com.example.classAppClassService.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
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
    @JsonSetter(nulls= Nulls.AS_EMPTY)
    private String className;
    @JsonProperty("CLASS NO")
    private int classNumber;
    @JsonProperty("eng_name")
    @JsonSetter(nulls= Nulls.AS_EMPTY)
    private String studentEnglishName;
    @JsonProperty("chi_name")
    @JsonSetter(nulls= Nulls.AS_EMPTY)
    private String studentChineseName;
    @JsonProperty("sex")
    @JsonSetter(nulls= Nulls.AS_EMPTY)
    private String studentGender;
    @JsonProperty("2_discip")
    @JsonSetter(nulls= Nulls.AS_EMPTY)
    private String discipline;
    @JsonProperty("3_rank_class")
    private int studentClassRank;
    @JsonProperty("3_rank_all")
    private int studentGradeRank;
    @JsonProperty("Remarks")
    @JsonSetter(nulls= Nulls.AS_EMPTY)
    private String remark;
}


