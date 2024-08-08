package com.mock_test.back.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestDTO {
    private Integer id;
    private String uuid;
    private String startTime;
    private Integer overallScore;
    private Integer readingScore;
    private List<Integer> readingIds;
    private Integer listeningScore;
    private List<Integer> listeningIds;
    private Integer speakingScore;
    private List<Integer> speakingIds;
    private Integer writingScore;
    private List<Integer> writingIds;
}
