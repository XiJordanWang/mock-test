package com.mock_test.back.reading.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ReadingTest {

    @JsonProperty("id")
    private String id;

    @JsonProperty("startTime")
    private String startTime;

    @JsonProperty("remainTime")
    private Number remainTime;

    @JsonProperty("index")
    private Integer index;

    @JsonProperty("total")
    private Integer total;

    @JsonProperty("questions")
    private List<QuestionDetail> questions;

    @JsonProperty("currentArticleId")
    private Integer currentArticleId;
    
    @JsonProperty("sequence")
    private Integer sequence;

    @Data
    public static
    class QuestionDetail {
        @JsonProperty("index")
        private Integer index;
        @JsonProperty("id")
        private Integer id;
        @JsonProperty("question")
        private String question;
        @JsonProperty("articleId")
        private Integer articleId;
        @JsonProperty("mySelection")
        private Integer mySelection;
        @JsonProperty("myAnswer")
        private String myAnswer;
        @JsonProperty("isSelected")
        private boolean isSelected;
    }
}
