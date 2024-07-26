package com.mock_test.back.reading.repository;

import com.mock_test.back.reading.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticlesRepository extends JpaRepository<Article, Integer> {
    @Query("SELECT t FROM Article t WHERE t.isDone = false ORDER BY RANDOM()")
    List<Article> findByIsDoneFalse();
}
