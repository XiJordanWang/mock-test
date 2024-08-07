package com.mock_test.back.writing.repository;


import com.mock_test.back.writing.model.Writing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WritingRepository extends JpaRepository<Writing, Integer> {
    Writing findFirstByTypeAndIsDoneFalse(Writing.Type type);
}