package com.mock_test.back.reading.repository;

import com.mock_test.back.reading.model.Article;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ArticlesRepository extends JpaRepository<Article, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Article a SET a.isDone = true WHERE a.id IN :idList")
    void updateIsDoneToTrue(@Param("idList") List<Integer> idList);


    @Transactional
    @Modifying
    @Query("update Article a set a.context = ?1 where a.id = ?2")
    void updateContextById(String context, Integer id);

    @Query("SELECT t FROM Article t WHERE t.isDone = false ORDER BY RANDOM()")
    List<Article> findByIsDoneFalse();
}
