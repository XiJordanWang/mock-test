package com.mock_test.back.reading.dto;

import com.mock_test.back.reading.model.Selection;
import lombok.Data;

import java.util.List;

@Data
public class AddReadingDTO {
    private String heading;
    private String context;
    private List<QuestionDTO> questions;
    private String highlightSentence;


    @Data
    public static class QuestionDTO {
        private String question;
        private Integer sequence;
        private String correctAnswer;
        private Integer paragraphNum;
        private List<SelectionDTO> selections;
    }

    @Data
    public static class SelectionDTO {
        private Selection.Option option;
        private String information;
    }
}
