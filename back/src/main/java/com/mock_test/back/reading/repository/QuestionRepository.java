package com.mock_test.back.reading.repository;

import com.mock_test.back.reading.model.Question;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    @Transactional
    @Modifying
    @Query("update Question q set q.correctness=true where q.id in :ids")
    void updateCorrectnessInIds(@Param("ids") List<Integer> ids);

    List<Question> findByArticleIdOrderBySequenceAsc(Integer articleId);

    List<Question> findByArticleIdInOrderByArticleIdAscSequenceAsc(List<Integer> articleIds);
}
