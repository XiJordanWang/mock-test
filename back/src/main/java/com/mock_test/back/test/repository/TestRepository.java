package com.mock_test.back.test.repository;

import com.mock_test.back.test.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface TestRepository extends JpaRepository<Test, Integer> {
    Test findByUuid(String uuid);

    @Query("SELECT t FROM Test t WHERE t.startTime = (SELECT MAX(t2.startTime) FROM Test t2)")
    Test findLatestTest();

    @Query("SELECT new map(" +
            "AVG(t.speakingScore) AS avgSpeakingScore, " +
            "AVG(t.listeningScore) AS avgListeningScore, " +
            "AVG(t.writingScore) AS avgWritingScore, " +
            "AVG(t.readingScore) AS avgReadingScore, " +
            "AVG(t.overallScore) AS avgOverallScore) " +
            "FROM Test t")
    Map<String, Double> findAverages();
}
