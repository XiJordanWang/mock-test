package com.mock_test.back.speaking.repository;

import com.mock_test.back.speaking.model.Speaking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeakingRepository extends JpaRepository<Speaking, Integer> {
    Speaking findFirstByType(Speaking.Type type);
}