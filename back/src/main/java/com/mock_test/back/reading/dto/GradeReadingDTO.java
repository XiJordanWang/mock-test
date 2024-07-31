package com.mock_test.back.reading.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class GradeReadingDTO {
    private String uuid;
    private LocalDateTime startTime;
    private List<Integer> readingArticleIds;
    private String readingScale;
    private Integer readingScore;
}
