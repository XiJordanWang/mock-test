package com.mock_test.back.reading.repository;

import com.mock_test.back.reading.model.Selection;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Repository
public interface SelectionRepository extends JpaRepository<Selection, Integer> {
    @Query("select s from Selection s where s.id in :ids")
    List<Selection> findByIdIn(@Param("ids") List<Integer> ids);

    @Transactional
    @Modifying
    @Query("update Selection s set s.myAnswer = true where s.id in :ids")
    void updateMyAnswers(@Param("ids") List<Integer> ids);

    List<Selection> findByQuestionId(Integer questionId);
}
