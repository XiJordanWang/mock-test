package com.mock_test.back.listening.repository;

import com.mock_test.back.listening.model.ListeningSelection;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ListeningSelectionRepository extends JpaRepository<ListeningSelection, Integer> {
    List<ListeningSelection> findByQuestionId(Integer questionId);

    @Modifying
    @Transactional
    @Query("UPDATE ListeningSelection ls SET ls.myAnswer = true WHERE ls.id IN :idList")
    void updateMyAnswerToTrue(@Param("idList") List<Integer> idList);
}
