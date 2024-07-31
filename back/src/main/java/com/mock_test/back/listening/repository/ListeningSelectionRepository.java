package com.mock_test.back.listening.repository;

import com.mock_test.back.listening.model.ListeningSelection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListeningSelectionRepository extends JpaRepository<ListeningSelection, Integer> {
}
