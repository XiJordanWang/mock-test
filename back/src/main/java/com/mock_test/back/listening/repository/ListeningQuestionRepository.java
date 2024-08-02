package com.mock_test.back.listening.repository;

import com.mock_test.back.listening.model.ListeningQuestion;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ListeningQuestionRepository extends JpaRepository<ListeningQuestion, Integer> {
    List<ListeningQuestion> findByListeningId(Integer listeningId);

    @Modifying
    @Transactional
    @Query("UPDATE ListeningQuestion lq SET lq.correctness = true WHERE lq.id IN :idList")
    void updateCorrectnessToTrue(@Param("idList") List<Integer> idList);
}
