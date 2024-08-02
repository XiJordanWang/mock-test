package com.mock_test.back.listening.repository;

import com.mock_test.back.listening.model.Listening;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ListeningRepository extends JpaRepository<Listening, Integer> {
    List<Listening> findByIsDoneFalse();

    @Modifying
    @Transactional
    @Query("UPDATE Listening l SET l.isDone = true WHERE l.id IN :idList")
    void updateIsDoneToTrue(@Param("idList") List<Integer> idList);
}
