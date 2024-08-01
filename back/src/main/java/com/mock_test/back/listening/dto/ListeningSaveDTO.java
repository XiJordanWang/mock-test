package com.mock_test.back.listening.dto;

import com.mock_test.back.listening.model.Listening;
import com.mock_test.back.listening.model.ListeningQuestion;
import com.mock_test.back.reading.model.Selection;
import lombok.Data;

import java.util.List;

@Data
public class ListeningSaveDTO {
    private Integer documentId;
    private Listening.Type type;
    private List<ListeningQuestionDTO> questions;

    @Data
    public static class ListeningQuestionDTO {
        private String fileName;
        private Integer sequence;
        private String question;
        private String correctAnswer;
        private ListeningQuestion.Type type;
        private List<ListeningSelectionDTO> selections;
    }

    @Data
    public static class ListeningSelectionDTO {
        private Selection.Option option;
        private String information;
    }
}
