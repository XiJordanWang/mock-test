package com.mock_test.back.reading.repository;

import com.mock_test.back.reading.model.Selection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelectionRepository extends JpaRepository<Selection, Integer> {
    List<Selection> findByQuestionId(Integer questionId);
}
