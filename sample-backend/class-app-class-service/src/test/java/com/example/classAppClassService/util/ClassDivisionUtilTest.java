package com.example.classAppClassService.util;

import com.example.classAppClassService.services.classClassification.ClassDivisionUtil;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;

import java.util.List;

@Log4j2
public class ClassDivisionUtilTest {
    @Test
    public void testGeneratedClassName(){
        List<String> result1 = ClassDivisionUtil.generateOrderedNewClassList(7, "E");
        List<String> result2 = ClassDivisionUtil.generateOrderedNewClassList(3, "A");
        List<String> result3 = ClassDivisionUtil.generateOrderedNewClassList(10, "J");
        List<String> result4 = ClassDivisionUtil.generateOrderedNewClassList(7, "J");
        log.debug(result1);
    }

}
