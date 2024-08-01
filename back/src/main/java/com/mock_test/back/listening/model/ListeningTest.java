package com.mock_test.back.listening.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class ListeningTest {
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

    @JsonProperty("currentQuestionId")
    private Integer currentQuestionId;

    @JsonProperty("section1")
    private List<ListeningDetail> section1;

    @JsonProperty("section2")
    private List<ListeningDetail> section2;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListeningDetail {

        @JsonProperty("id")
        private Integer id;

        @JsonProperty("type")
        private String type;

        @JsonProperty("questions")
        private List<ListeningQuestion> questions;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ListeningQuestion {
        @JsonProperty("index")
        private Integer index;

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
