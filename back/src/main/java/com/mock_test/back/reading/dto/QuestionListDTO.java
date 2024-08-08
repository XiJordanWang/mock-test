package com.mock_test.back.reading.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionListDTO {
    private Integer id;
    private Integer articleId;
    private boolean correctness;
}
