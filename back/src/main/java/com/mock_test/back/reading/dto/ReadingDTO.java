package com.mock_test.back.reading.dto;

import com.mock_test.back.reading.model.Question;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReadingDTO {
    private Integer id;
    private String heading;
    private String context;
    private Integer questionId;
    private Integer paragraphNum;
    private String question;
    private Question.Type type;
    private Integer mySelection;
    private Integer sequence;
    private List<SelectionDTO> selections;

    @Data
    @Builder
    public static class SelectionDTO {
        private Integer id;
        private String information;
    }
}
