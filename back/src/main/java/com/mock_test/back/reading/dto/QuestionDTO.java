package com.mock_test.back.reading.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionDTO {
    private Integer articleId;
    private Integer questionId;
    private Integer index;
    private String question;
}
