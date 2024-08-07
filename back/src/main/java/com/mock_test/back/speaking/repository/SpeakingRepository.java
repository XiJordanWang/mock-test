package com.mock_test.back.speaking.repository;

import com.mock_test.back.speaking.model.Speaking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import io.lettuce.core.dynamic.annotation.Param;

import java.util.List;

public interface SpeakingRepository extends JpaRepository<Speaking, Integer> {
    Speaking findFirstByTypeAndIsDoneFalse(Speaking.Type type);

    @Modifying
    @Transactional
    @Query("UPDATE Speaking s SET s.isDone = true WHERE s.id IN :ids")
    void updateIsDoneByIds(@Param("ids") List<Integer> ids);
}