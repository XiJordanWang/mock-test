package com.mock_test.back.listening.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ListeningTestDTO {
    @JsonProperty("id")
    private String id;

    @JsonProperty("index")
    private Integer index;

    @JsonProperty("total")
    private Integer total;

    @JsonProperty("startTime")
    private String startTime;

    @JsonProperty("remainTime")
    private Integer remainTime;

    @JsonProperty("currentSection")
    private String currentSection;

    @JsonProperty("currentListeningId")
    private Integer currentListeningId;

    @JsonProperty("listeningPath")
    private String listeningPath;

    @JsonProperty("section1")
    private List<ListeningDetailDTO> section1;

    @JsonProperty("section2")
    private List<ListeningDetailDTO> section2;

    @Data
    @Builder
    public static class ListeningDetailDTO {

        @JsonProperty("id")
        private Integer id;

        @JsonProperty("type")
        private String type;

        @JsonProperty("questions")
        private List<ListeningQuestionDTO> questions;
    }

    @Data
    @Builder
    public static class ListeningQuestionDTO {

        @JsonProperty("id")
        private Integer id;

        @JsonProperty("question")
        private String question;

        @JsonProperty("myAnswer")
        private Integer myAnswer;

        @JsonProperty("type")
        private String type;
    }
}
