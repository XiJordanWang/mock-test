package com.mock_test.back.test.service;

import com.mock_test.back.reading.dto.GradeReadingDTO;
import com.mock_test.back.test.dto.DashboardDTO;
import com.mock_test.back.test.model.Test;
import com.mock_test.back.test.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class TestService {

    @Autowired
    TestRepository testRepository;

    public Test findByUUID(String uuid) {
        return testRepository.findByUuid(uuid);
    }

    public void saveOrUpdate(Test test) {
        testRepository.save(test);
    }


    public void saveReading(GradeReadingDTO dto) {
        testRepository.save(Test.builder()
                .uuid(dto.getUuid())
                .startTime(dto.getStartTime())
                .readingArticleIds(dto.getReadingArticleIds())
                .readingScale(dto.getReadingScale())
                .readingScore(dto.getReadingScore())
                .build());
    }

    public DashboardDTO getLastTest() {
        Test test = testRepository.findLatestTest();
        test.setOverallScore(
                (test.getReadingScore() != null ? test.getReadingScore() : 0) +
                        (test.getListeningScore() != null ? test.getListeningScore() : 0) +
                        (test.getSpeakingScore() != null ? test.getSpeakingScore() : 0) +
                        (test.getWritingScore() != null ? test.getWritingScore() : 0)
        );

        DashboardDTO dto = new DashboardDTO();
        dto.setReading(test.getReadingScore());
        dto.setListening(test.getListeningScore());
        dto.setSpeaking(test.getSpeakingScore());
        dto.setWriting((test.getWritingScore() != null ? test.getWritingScore() : 0));
        dto.setOverall(test.getOverallScore());
        dto.setStartDate(test.getStartTime().format(DateTimeFormatter.ofPattern("MM/dd/yyyy")));

        testRepository.save(test);
        return dto;
    }

    public DashboardDTO getAverage() {
        Map<String, Double> averages = testRepository.findAverages();
        DashboardDTO dto = new DashboardDTO();
        dto.setReading((int) Math.round(averages.get("avgReadingScore")));
        dto.setListening((int) Math.round(averages.get("avgListeningScore")));
        dto.setSpeaking((int) Math.round(averages.get("avgSpeakingScore")));
        dto.setWriting((int) Math.round(averages.get("avgWritingScore") != null ? averages.get("avgWritingScore") : 0));
        dto.setOverall((int) Math.round(averages.get("avgOverallScore")));
        return dto;
    }
}
