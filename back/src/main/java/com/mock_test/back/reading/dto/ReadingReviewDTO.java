package com.mock_test.back.reading.dto;

import com.mock_test.back.reading.model.Question;
import lombok.Data;

import java.util.List;

@Data
public class ReadingReviewDTO {
    private Integer id;
    private String heading;
    private String context;
    private Integer questionId;
    private Integer paragraphNum;
    private String question;
    private Question.Type type;
    private Integer sequence;
    private List<SelectionDTO> selections;

    @Data
    public static class SelectionDTO {
        private Integer id;
        private String information;
        private boolean isMyAnswer;
        private boolean correctness;
        private Integer index;
    }
}
