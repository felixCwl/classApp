package com.example.classAppClassService.repository;

import com.example.classAppClassService.entity.ClassDivisionExcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
public interface ClassDivisionRepository extends JpaRepository<ClassDivisionExcel, Long> {
    @Transactional
    default ClassDivisionExcel updateOrInsert(ClassDivisionExcel entity) {
        return save(entity);
    }
}
