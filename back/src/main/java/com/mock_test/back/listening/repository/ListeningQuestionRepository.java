package com.mock_test.back.listening.repository;

import com.mock_test.back.listening.model.ListeningQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListeningQuestionRepository extends JpaRepository<ListeningQuestion, Integer> {
    List<ListeningQuestion> findByListeningId(Integer listeningId);
}
