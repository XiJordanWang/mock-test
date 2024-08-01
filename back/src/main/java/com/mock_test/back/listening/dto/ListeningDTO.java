package com.mock_test.back.listening.dto;

import com.mock_test.back.listening.model.ListeningQuestion;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ListeningDTO {
    private int id;
    private String question;
    private ListeningQuestion.Type type;
    private List<ListeningSelectionsDTO> selections;

    @Data
    @Builder
    public static
    class ListeningSelectionsDTO {
        private Integer id;
        private String information;
    }
}
