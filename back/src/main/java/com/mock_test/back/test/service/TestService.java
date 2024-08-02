package com.mock_test.back.test.service;

import com.mock_test.back.reading.dto.GradeReadingDTO;
import com.mock_test.back.test.model.Test;
import com.mock_test.back.test.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
