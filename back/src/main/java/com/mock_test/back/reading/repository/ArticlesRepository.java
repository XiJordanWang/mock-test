package com.mock_test.back.reading.repository;

import com.mock_test.back.reading.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesRepository extends JpaRepository<Article, Integer> {
}
