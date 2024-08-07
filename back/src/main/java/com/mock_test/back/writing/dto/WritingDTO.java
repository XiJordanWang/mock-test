package com.mock_test.back.writing.dto;

import com.mock_test.back.writing.model.Writing;
import lombok.Data;

@Data
public class WritingDTO {
    private Integer id;
    private String reading;
    private String question;
    private String professorQuestion;
    private String studentA;
    private String studentB;
    private Writing.Type type;
    private String myResponse;
}
