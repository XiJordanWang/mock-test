package com.mock_test.back.listening.repository;

import com.mock_test.back.listening.model.Listening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListeningRepository extends JpaRepository<Listening, Integer> {
}
