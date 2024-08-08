package com.mock_test.back.test.service;

import com.mock_test.back.reading.dto.GradeReadingDTO;
import com.mock_test.back.test.dto.DashboardDTO;
import com.mock_test.back.test.dto.TestDTO;
import com.mock_test.back.test.model.Test;
import com.mock_test.back.test.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TestService {

    @Autowired
    TestRepository testRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

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

    public Page<TestDTO> findPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("startTime")));
        Page<Test> testPage = testRepository.findAll(pageable);

        // Convert the Page<Test> to Page<TestDTO>
        List<TestDTO> testDTOs = testPage.getContent().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(testDTOs, pageable, testPage.getTotalElements());
    }

    private TestDTO convertToDTO(Test test) {
        TestDTO dto = new TestDTO();
        dto.setId(test.getId());
        dto.setUuid(test.getUuid());
        dto.setStartTime(test.getStartTime().format(DATE_FORMATTER)); // Format the date
        dto.setOverallScore(test.getOverallScore());
        dto.setReadingScore(test.getReadingScore());
        dto.setReadingIds(test.getReadingArticleIds());
        dto.setListeningScore(test.getListeningScore());
        dto.setListeningIds(test.getListeningIds());
        dto.setSpeakingScore(test.getSpeakingScore());
        dto.setSpeakingIds(test.getSpeakingIds());
        dto.setWritingScore(test.getWritingScore());
        dto.setWritingIds(test.getWritingIds());
        return dto;
    }
}
